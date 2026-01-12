import { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, Filter, X, Download, FileSpreadsheet, FileText } from 'lucide-react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { dtcLogoBase64 } from '../data/logoData';

const DataGrid = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sectionFilter, setSectionFilter] = useState('All');
  const [electiveFilter, setElectiveFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const itemsPerPage = 10;

  const sections = ['All', 'CSE A', 'CSE B', 'CSE C', 'CST D'];
  const electives = ['All', 'AIML', 'DS'];
  const genders = ['All', 'MALE', 'FEMALE'];

  const filteredData = useMemo(() => {
    return data.filter(student => {
      const matchesSearch = 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.enrollment.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSection = sectionFilter === 'All' || student.section === sectionFilter;
      const matchesElective = electiveFilter === 'All' || student.elective === electiveFilter;
      const matchesGender = genderFilter === 'All' || student.gender === genderFilter;
      return matchesSearch && matchesSection && matchesElective && matchesGender;
    });
  }, [data, searchTerm, sectionFilter, electiveFilter, genderFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const clearFilters = () => {
    setSearchTerm('');
    setSectionFilter('All');
    setElectiveFilter('All');
    setGenderFilter('All');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchTerm || sectionFilter !== 'All' || electiveFilter !== 'All' || genderFilter !== 'All';

  // Generate filename based on active filters
  const getFileName = () => {
    let name = 'Student_Directory';
    if (sectionFilter !== 'All') name += `_${sectionFilter.replace(' ', '_')}`;
    if (electiveFilter !== 'All') name += `_${electiveFilter}`;
    if (genderFilter !== 'All') name += `_${genderFilter}`;
    return name;
  };

  // Fetch user's IP address
  const getUserIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.log('Could not fetch IP:', error);
      return 'N/A';
    }
  };

  // Export to Excel (with logo header)
  const exportToExcel = async () => {
    try {
      // Get user IP
      const userIP = await getUserIP();
      
      // Create workbook and worksheet
      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'Delhi Technical Campus';
      workbook.created = new Date();
      
      const worksheet = workbook.addWorksheet('Students', {
        pageSetup: { paperSize: 9, orientation: 'portrait' }
      });

      // Add logo image
      const logoId = workbook.addImage({
        base64: dtcLogoBase64,
        extension: 'png',
      });
      
      // Position logo (column B-C, rows 1-4)
      worksheet.addImage(logoId, {
        tl: { col: 0.5, row: 0.2 },
        ext: { width: 80, height: 80 }
      });

      // Set column widths
      worksheet.columns = [
        { width: 8 },   // A - S.No
        { width: 18 },  // B - Enrollment
        { width: 35 },  // C - Name
        { width: 12 },  // D - Section
        { width: 15 },  // E - Elective
        { width: 12 }   // F - Gender
      ];

      // Add empty rows for logo space
      worksheet.addRow([]);
      worksheet.addRow([]);
      worksheet.addRow([]);
      worksheet.addRow([]);

      // Add header text (row 5)
      const titleRow = worksheet.addRow(['', '', 'DELHI TECHNICAL CAMPUS', '', '', '']);
      worksheet.mergeCells('C5:F5');
      titleRow.getCell(3).font = { bold: true, size: 16, color: { argb: 'FF4F46E5' } };
      titleRow.getCell(3).alignment = { horizontal: 'center' };
      titleRow.height = 25;

      // Add subtitle (row 6)
      const subtitleRow = worksheet.addRow(['', '', 'Student Directory', '', '', '']);
      worksheet.mergeCells('C6:F6');
      subtitleRow.getCell(3).font = { bold: true, size: 14 };
      subtitleRow.getCell(3).alignment = { horizontal: 'center' };

      // Add filter info (row 7)
      let filterText = '';
      if (sectionFilter !== 'All') filterText += `Section: ${sectionFilter} | `;
      if (electiveFilter !== 'All') filterText += `Elective: ${electiveFilter} | `;
      if (genderFilter !== 'All') filterText += `Gender: ${genderFilter} | `;
      filterText = filterText ? filterText.slice(0, -3) : 'All Students';
      
      const filterRow = worksheet.addRow(['', '', `Filters: ${filterText}`, '', '', '']);
      worksheet.mergeCells('C7:F7');
      filterRow.getCell(3).font = { size: 10, color: { argb: 'FF666666' } };
      filterRow.getCell(3).alignment = { horizontal: 'center' };

      // Add total count (row 8)
      const totalRow = worksheet.addRow(['', '', `Total: ${filteredData.length} students | Generated: ${new Date().toLocaleDateString()} | IP: ${userIP}`, '', '', '']);
      worksheet.mergeCells('C8:F8');
      totalRow.getCell(3).font = { size: 10, color: { argb: 'FF666666' } };
      totalRow.getCell(3).alignment = { horizontal: 'center' };

      // Add empty row (row 9)
      worksheet.addRow([]);

      // Add table header (row 10)
      const headerRow = worksheet.addRow(['S.No', 'Enrollment No', 'Name', 'Section', 'Elective', 'Gender']);
      headerRow.eachCell((cell) => {
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4F46E5' } };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
      headerRow.height = 22;

      // Add student data
      filteredData.forEach((student, index) => {
        const row = worksheet.addRow([
          index + 1,
          student.enrollment,
          student.name,
          student.section,
          student.elective,
          student.gender === 'MALE' ? 'Male' : 'Female'
        ]);
        
        row.eachCell((cell, colNumber) => {
          cell.border = {
            top: { style: 'thin', color: { argb: 'FFE0E0E0' } },
            left: { style: 'thin', color: { argb: 'FFE0E0E0' } },
            bottom: { style: 'thin', color: { argb: 'FFE0E0E0' } },
            right: { style: 'thin', color: { argb: 'FFE0E0E0' } }
          };
          if (colNumber === 1 || colNumber === 4 || colNumber === 5 || colNumber === 6) {
            cell.alignment = { horizontal: 'center' };
          }
        });
        
        // Alternate row colors
        if (index % 2 === 1) {
          row.eachCell((cell) => {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF5F5FA' } };
          });
        }
      });

      // Generate and save file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `${getFileName()}.xlsx`);
      setShowExportMenu(false);
    } catch (error) {
      console.error('Export error:', error);
      setShowExportMenu(false);
    }
  };

  // Export to PDF (with logo)
  const exportToPDF = async () => {
    try {
      const doc = new jsPDF();
      
      // Add embedded logo (centered)
      doc.addImage(dtcLogoBase64, 'PNG', 90, 5, 30, 30);
    
      // Header (positioned below logo)
      doc.setFontSize(18);
      doc.setTextColor(79, 70, 229); // Indigo color
      doc.text('Delhi Technical Campus', 105, 42, { align: 'center' });
    
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('Student Directory', 105, 50, { align: 'center' });
    
      // Filter info
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      let filterText = 'Filters: ';
      if (sectionFilter !== 'All') filterText += `Section: ${sectionFilter} | `;
      if (electiveFilter !== 'All') filterText += `Elective: ${electiveFilter} | `;
      if (genderFilter !== 'All') filterText += `Gender: ${genderFilter} | `;
      if (filterText === 'Filters: ') filterText = 'Showing all students';
      else filterText = filterText.slice(0, -3);
      doc.text(filterText, 105, 57, { align: 'center' });
      doc.text(`Total: ${filteredData.length} students`, 105, 63, { align: 'center' });

      // Table data
      const tableData = filteredData.map((student, index) => [
        index + 1,
        student.enrollment,
        student.name,
        student.section,
        student.elective,
        student.gender === 'MALE' ? 'Male' : 'Female'
      ]);

      autoTable(doc, {
        startY: 70,
        head: [['S.No', 'Enrollment No', 'Name', 'Section', 'Elective', 'Gender']],
        body: tableData,
        theme: 'grid',
        headStyles: {
          fillColor: [79, 70, 229],
          textColor: 255,
          fontStyle: 'bold',
          halign: 'center'
        },
        styles: {
          fontSize: 9,
          cellPadding: 3
        },
        columnStyles: {
          0: { halign: 'center', cellWidth: 15 },
          1: { halign: 'center', cellWidth: 30 },
          2: { cellWidth: 50 },
          3: { halign: 'center', cellWidth: 25 },
          4: { halign: 'center', cellWidth: 25 },
          5: { halign: 'center', cellWidth: 20 }
        },
        alternateRowStyles: {
          fillColor: [245, 245, 250]
        }
      });

      // Get user IP for footer
      const userIP = await getUserIP();

      // Footer with IP address
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(
          `Page ${i} of ${pageCount} | Generated on ${new Date().toLocaleDateString()} | IP: ${userIP}`,
          105,
          doc.internal.pageSize.height - 10,
          { align: 'center' }
        );
      }

      doc.save(`${getFileName()}.pdf`);
      setShowExportMenu(false);
    } catch (error) {
      console.error('PDF Export error:', error);
      setShowExportMenu(false);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">Student Directory</h3>
          <p className="text-slate-400 text-sm">
            Showing {filteredData.length} of {data.length} students
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          {/* Search */}
          <div className="relative flex-1 lg:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or enrollment..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full lg:w-64 pl-10 pr-4 py-2.5 rounded-xl glass-input text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>

          {/* Section Filter */}
          <div className="relative">
            <select
              value={sectionFilter}
              onChange={(e) => {
                setSectionFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none w-full sm:w-36 px-4 py-2.5 rounded-xl glass-input text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer transition-all"
            >
              {sections.map(section => (
                <option key={section} value={section} className="bg-slate-800">
                  {section === 'All' ? 'All Sections' : section}
                </option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          {/* Elective Filter */}
          <div className="relative">
            <select
              value={electiveFilter}
              onChange={(e) => {
                setElectiveFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none w-full sm:w-36 px-4 py-2.5 rounded-xl glass-input text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer transition-all"
            >
              {electives.map(elective => (
                <option key={elective} value={elective} className="bg-slate-800">
                  {elective === 'All' ? 'All Electives' : elective}
                </option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          {/* Gender Filter */}
          <div className="relative">
            <select
              value={genderFilter}
              onChange={(e) => {
                setGenderFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none w-full sm:w-36 px-4 py-2.5 rounded-xl glass-input text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer transition-all"
            >
              {genders.map(gender => (
                <option key={gender} value={gender} className="bg-slate-800">
                  {gender === 'All' ? 'All Genders' : gender === 'MALE' ? 'Male' : 'Female'}
                </option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}

          {/* Export Button */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30 transition-all"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>

            {/* Export Dropdown Menu */}
            {showExportMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowExportMenu(false)}
                />
                <div className="absolute right-0 top-full mt-2 z-20 w-48 rounded-xl glass-card border border-slate-700/50 shadow-xl overflow-hidden">
                  <div className="p-2">
                    <p className="text-xs text-slate-400 px-3 py-2 font-medium">Download {filteredData.length} students</p>
                    <button
                      onClick={exportToExcel}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white hover:bg-slate-700/50 transition-all"
                    >
                      <FileSpreadsheet className="w-5 h-5 text-green-400" />
                      <div className="text-left">
                        <p className="font-medium">Excel (.xlsx)</p>
                        <p className="text-xs text-slate-400">Spreadsheet format</p>
                      </div>
                    </button>
                    <button
                      onClick={exportToPDF}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white hover:bg-slate-700/50 transition-all"
                    >
                      <FileText className="w-5 h-5 text-red-400" />
                      <div className="text-left">
                        <p className="font-medium">PDF (.pdf)</p>
                        <p className="text-xs text-slate-400">Print-ready format</p>
                      </div>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left py-4 px-4 text-slate-400 font-medium text-sm">#</th>
              <th className="text-left py-4 px-4 text-slate-400 font-medium text-sm">Enrollment</th>
              <th className="text-left py-4 px-4 text-slate-400 font-medium text-sm">Name</th>
              <th className="text-left py-4 px-4 text-slate-400 font-medium text-sm">Section</th>
              <th className="text-left py-4 px-4 text-slate-400 font-medium text-sm">Elective</th>
              <th className="text-left py-4 px-4 text-slate-400 font-medium text-sm">Gender</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((student, index) => (
              <tr
                key={student.id}
                className="border-b border-slate-700/30 hover:bg-slate-800/30 transition-colors"
              >
                <td className="py-4 px-4 text-slate-500 text-sm">
                  {startIndex + index + 1}
                </td>
                <td className="py-4 px-4">
                  <span className="font-mono text-slate-300 text-sm">{student.enrollment}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-white font-medium">{student.name}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 rounded-lg bg-slate-700/50 text-slate-300 text-sm">
                    {student.section}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      student.elective === 'AIML'
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                    }`}
                  >
                    {student.elective}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      student.gender === 'MALE'
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                        : 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30'
                    }`}
                  >
                    {student.gender === 'MALE' ? 'Male' : 'Female'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {paginatedData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">No students found matching your criteria.</p>
          <button
            onClick={clearFilters}
            className="mt-4 text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-slate-700/50">
          <p className="text-slate-400 text-sm">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-700/50 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </button>
            
            {/* Page numbers */}
            <div className="hidden sm:flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-xl transition-all ${
                      currentPage === pageNum
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-700/50 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataGrid;
