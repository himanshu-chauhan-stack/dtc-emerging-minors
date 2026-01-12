import { useMemo } from 'react';
import { studentData } from '../data/studentData';

export const useAnalytics = () => {
  const analytics = useMemo(() => {
    // Normalize section names (CSTD -> CST D)
    const normalizedData = studentData.map(student => ({
      ...student,
      section: student.section === 'CSTD' ? 'CST D' : student.section
    }));

    // Total counts
    const totalStudents = normalizedData.length;
    const aimlStudents = normalizedData.filter(s => s.elective === 'AIML').length;
    const dsStudents = normalizedData.filter(s => s.elective === 'DS').length;

    // Gender counts
    const maleStudents = normalizedData.filter(s => s.gender === 'MALE').length;
    const femaleStudents = normalizedData.filter(s => s.gender === 'FEMALE').length;

    // Gender by elective
    const maleAiml = normalizedData.filter(s => s.gender === 'MALE' && s.elective === 'AIML').length;
    const maleDs = normalizedData.filter(s => s.gender === 'MALE' && s.elective === 'DS').length;
    const femaleAiml = normalizedData.filter(s => s.gender === 'FEMALE' && s.elective === 'AIML').length;
    const femaleDs = normalizedData.filter(s => s.gender === 'FEMALE' && s.elective === 'DS').length;

    // Gender pie data
    const genderPieData = [
      { name: 'Male', value: maleStudents, color: '#60a5fa' },
      { name: 'Female', value: femaleStudents, color: '#f472b6' }
    ];

    // Gender by elective data
    const genderElectiveData = [
      { name: 'Male', AIML: maleAiml, DS: maleDs },
      { name: 'Female', AIML: femaleAiml, DS: femaleDs }
    ];

    // Section-wise breakdown
    const sections = ['CSE A', 'CSE B', 'CSE C', 'CST D'];
    const sectionData = sections.map(section => {
      const sectionStudents = normalizedData.filter(s => s.section === section);
      const aiml = sectionStudents.filter(s => s.elective === 'AIML').length;
      const ds = sectionStudents.filter(s => s.elective === 'DS').length;
      const male = sectionStudents.filter(s => s.gender === 'MALE').length;
      const female = sectionStudents.filter(s => s.gender === 'FEMALE').length;
      const total = sectionStudents.length;
      return {
        section,
        AIML: aiml,
        DS: ds,
        male,
        female,
        total,
        aimlPercent: total > 0 ? ((aiml / total) * 100).toFixed(1) : 0,
        dsPercent: total > 0 ? ((ds / total) * 100).toFixed(1) : 0,
        malePercent: total > 0 ? ((male / total) * 100).toFixed(1) : 0,
        femalePercent: total > 0 ? ((female / total) * 100).toFixed(1) : 0
      };
    });

    // Most populated section
    const mostPopulatedSection = sectionData.reduce((prev, current) => 
      prev.total > current.total ? prev : current
    );

    // Pie chart data
    const pieData = [
      { name: 'AIML', value: aimlStudents, color: '#818cf8' },
      { name: 'DS', value: dsStudents, color: '#f472b6' }
    ];

    // Generate insights
    const insights = generateInsights(sectionData, aimlStudents, dsStudents, totalStudents, maleStudents, femaleStudents, maleAiml, maleDs, femaleAiml, femaleDs);

    return {
      normalizedData,
      totalStudents,
      aimlStudents,
      dsStudents,
      maleStudents,
      femaleStudents,
      maleAiml,
      maleDs,
      femaleAiml,
      femaleDs,
      sectionData,
      mostPopulatedSection,
      pieData,
      genderPieData,
      genderElectiveData,
      insights
    };
  }, []);

  return analytics;
};

const generateInsights = (sectionData, aimlStudents, dsStudents, totalStudents, maleStudents, femaleStudents, maleAiml, maleDs, femaleAiml, femaleDs) => {
  const insights = [];

  // Overall preference
  const globalAimlPercent = ((aimlStudents / totalStudents) * 100).toFixed(1);
  const globalDsPercent = ((dsStudents / totalStudents) * 100).toFixed(1);
  
  if (aimlStudents > dsStudents) {
    insights.push({
      type: 'global',
      icon: '🎯',
      text: `Overall, AIML is the preferred elective with ${globalAimlPercent}% of students choosing it over DS (${globalDsPercent}%).`
    });
  } else {
    insights.push({
      type: 'global',
      icon: '📊',
      text: `Overall, DS is the preferred elective with ${globalDsPercent}% of students choosing it over AIML (${globalAimlPercent}%).`
    });
  }

  // Section with highest AIML preference
  const highestAiml = sectionData.reduce((prev, current) => 
    parseFloat(current.aimlPercent) > parseFloat(prev.aimlPercent) ? current : prev
  );
  insights.push({
    type: 'aiml',
    icon: '🤖',
    text: `${highestAiml.section} has the highest preference for AIML with ${highestAiml.aimlPercent}% of students (${highestAiml.AIML} out of ${highestAiml.total}).`
  });

  // Section with highest DS preference
  const highestDs = sectionData.reduce((prev, current) => 
    parseFloat(current.dsPercent) > parseFloat(prev.dsPercent) ? current : prev
  );
  insights.push({
    type: 'ds',
    icon: '📈',
    text: `${highestDs.section} leans heavily towards DS with ${highestDs.dsPercent}% preference (${highestDs.DS} out of ${highestDs.total} students).`
  });

  // Largest section
  const largestSection = sectionData.reduce((prev, current) => 
    current.total > prev.total ? current : prev
  );
  insights.push({
    type: 'size',
    icon: '👥',
    text: `${largestSection.section} is the largest section with ${largestSection.total} students, making up ${((largestSection.total / totalStudents) * 100).toFixed(1)}% of the total cohort.`
  });

  // Balance insight
  const mostBalanced = sectionData.reduce((prev, current) => {
    const prevDiff = Math.abs(parseFloat(prev.aimlPercent) - 50);
    const currDiff = Math.abs(parseFloat(current.aimlPercent) - 50);
    return currDiff < prevDiff ? current : prev;
  });
  insights.push({
    type: 'balance',
    icon: '⚖️',
    text: `${mostBalanced.section} has the most balanced elective distribution with ${mostBalanced.aimlPercent}% AIML and ${mostBalanced.dsPercent}% DS.`
  });

  // Gender insights
  const malePercent = ((maleStudents / totalStudents) * 100).toFixed(1);
  const femalePercent = ((femaleStudents / totalStudents) * 100).toFixed(1);
  insights.push({
    type: 'gender',
    icon: '👨‍🎓',
    text: `The cohort is ${malePercent}% male (${maleStudents}) and ${femalePercent}% female (${femaleStudents}).`
  });

  // Gender elective preference
  const maleAimlPercent = maleStudents > 0 ? ((maleAiml / maleStudents) * 100).toFixed(1) : 0;
  const femaleAimlPercent = femaleStudents > 0 ? ((femaleAiml / femaleStudents) * 100).toFixed(1) : 0;
  insights.push({
    type: 'gender-elective',
    icon: '🎓',
    text: `${maleAimlPercent}% of male students prefer AIML, while ${femaleAimlPercent}% of female students prefer AIML.`
  });

  // Section with highest female representation
  const highestFemale = sectionData.reduce((prev, current) => 
    parseFloat(current.femalePercent) > parseFloat(prev.femalePercent) ? current : prev
  );
  insights.push({
    type: 'gender-section',
    icon: '👩‍💻',
    text: `${highestFemale.section} has the highest female representation with ${highestFemale.femalePercent}% (${highestFemale.female} students).`
  });

  return insights;
};
