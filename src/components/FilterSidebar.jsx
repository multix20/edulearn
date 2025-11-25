import React, { useState } from 'react';
import { X, ChevronDown, ChevronRight } from 'lucide-react';

const FilterSidebar = ({ isOpen, onClose, activeFilters, onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    subjects: true,
    gradeLevel: true,
    resourceType: false,
    occasion: false,
    commonCore: false,
    rolyRecommends: false,
    gameType: false,
    artsCrafts: false,
    coloring: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const filterSections = {
    subjects: {
      title: 'Subjects',
      items: [
        'Math',
        'English Language Arts',
        'Science',
        'Social Studies'
      ]
    },
    gradeLevel: {
      title: 'Grade Level',
      items: [
        'Pre-K',
        'K',
        '1st',
        '2nd',
        '3rd',
        '4th',
        '5th',
        '6th',
        '7th',
        '8th'
      ],
      groups: [
        { name: 'Early Childhood', grades: ['Pre-K', 'K'] },
        { name: 'Elementary School', grades: ['1st', '2nd', '3rd', '4th', '5th'] },
        { name: 'Middle School', grades: ['6th', '7th', '8th'] }
      ]
    },
    resourceType: {
      title: 'Resource Type',
      items: [
        'Worksheets',
        'Lesson Plans',
        'Interactive Worksheets',
        'Workbooks',
        'Activities',
        'Offline Games',
        'Teacher Resources'
      ]
    },
    occasion: {
      title: 'Occasion',
      items: [
        'Asian Pacific American Heritage Month',
        'Summer',
        'Back to School',
        'Fall',
        'Hispanic Heritage Month'
      ],
      hasMore: true
    },
    commonCore: {
      title: 'Common Core',
      items: ['Yes']
    },
    rolyRecommends: {
      title: 'Roly Recommends',
      items: ['Social Emotional Learning']
    },
    gameType: {
      title: 'Game Type',
      items: [
        'Group Games',
        'Puzzles & Sudoku',
        'Word Puzzles'
      ]
    },
    artsCrafts: {
      title: 'Arts & Crafts',
      items: [
        'Arts & Crafts',
        'Paper & Glue Crafts',
        'Construction & Sculpture',
        'Painting & Drawing'
      ]
    },
    coloring: {
      title: 'Coloring',
      items: ['Yes']
    }
  };

  const handleFilterClick = (section, item) => {
    if (onFilterChange) {
      onFilterChange(section, item);
    }
  };

  const isFilterActive = (section, item) => {
    return activeFilters?.[section]?.includes(item) || false;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`fixed md:sticky top-0 left-0 h-screen w-80 bg-white shadow-xl z-50 overflow-y-auto transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          <button
            onClick={onClose}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Filter Sections */}
        <div className="p-4 space-y-4">
          {Object.entries(filterSections).map(([key, section]) => (
            <div key={key} className="border-b border-gray-200 pb-4">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(key)}
                className="w-full flex items-center justify-between py-2 text-left hover:bg-gray-50 rounded-lg px-2 transition-colors"
              >
                <span className="font-semibold text-gray-900">{section.title}</span>
                {expandedSections[key] ? (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {/* Section Items */}
              {expandedSections[key] && (
                <div className="mt-2 space-y-2 pl-2">
                  {/* Grade Level Groups (if applicable) */}
                  {key === 'gradeLevel' && section.groups && (
                    <div className="space-y-3 mb-3">
                      {section.groups.map(group => (
                        <div key={group.name}>
                          <p className="text-sm font-medium text-gray-700 mb-1">{group.name}</p>
                          <div className="pl-2 space-y-1">
                            {group.grades.map(grade => (
                              <label
                                key={grade}
                                className="flex items-center gap-2 py-1 cursor-pointer hover:bg-gray-50 rounded px-2"
                              >
                                <input
                                  type="checkbox"
                                  checked={isFilterActive(key, grade)}
                                  onChange={() => handleFilterClick(key, grade)}
                                  className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                                />
                                <span className="text-sm text-gray-700">{grade}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Regular Items */}
                  {key !== 'gradeLevel' && section.items.map(item => (
                    <label
                      key={item}
                      className="flex items-center gap-2 py-1 cursor-pointer hover:bg-gray-50 rounded px-2"
                    >
                      <input
                        type="checkbox"
                        checked={isFilterActive(key, item)}
                        onChange={() => handleFilterClick(key, item)}
                        className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                      />
                      <span className="text-sm text-gray-700">{item}</span>
                    </label>
                  ))}

                  {/* Grade Level individual items */}
                  {key === 'gradeLevel' && (
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-2">All Grades</p>
                      <div className="space-y-1">
                        {section.items.map(item => (
                          <label
                            key={item}
                            className="flex items-center gap-2 py-1 cursor-pointer hover:bg-gray-50 rounded px-2"
                          >
                            <input
                              type="checkbox"
                              checked={isFilterActive(key, item)}
                              onChange={() => handleFilterClick(key, item)}
                              className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                            />
                            <span className="text-sm text-gray-700">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* See More Link */}
                  {section.hasMore && (
                    <button className="text-sm text-violet-600 hover:text-violet-700 font-medium mt-2">
                      See more
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Clear All Button */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <button
            onClick={() => onFilterChange && onFilterChange('clearAll')}
            className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
