"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  AcademicHistory,
  PrimaryEducation,
  Qualification,
  SecondaryEducation,
  SubjectGrade,
  TertiaryEducation,
} from "./new_application";
import { ChevronLeft } from "lucide-react";

interface AcademicHistoryFormProps {
  data?: Partial<AcademicHistory>;
  updateData: (data: AcademicHistory) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const AcademicHistoryForm: React.FC<AcademicHistoryFormProps> = ({
  data,
  updateData,
  nextStep,
  prevStep,
}) => {
  const [formData, setFormData] = useState<AcademicHistory>({
    primaryEducation: data?.primaryEducation,
    secondarySchool: data?.secondarySchool || [],
    tertiaryEducation: data?.tertiaryEducation || [],
    qualifications: data?.qualifications || [],
  });

  const [currentPrimary, setCurrentPrimary] = useState<
    Partial<PrimaryEducation>
  >(data?.primaryEducation || {});

  const [currentSecondary, setCurrentSecondary] = useState<
    Partial<SecondaryEducation>
  >(
    data?.secondarySchool?.[0] || {
      examType: "WAEC",
      sitting: "first",
      schoolType: "Public",
      completionYear: new Date().getFullYear(),
      grades: [],
    }
  );

  const [currentSubject, setCurrentSubject] = useState<SubjectGrade>({
    subject: "",
    grade: "",
  });

  const [showTertiaryForm, setShowTertiaryForm] = useState(false);
  const [newTertiary, setNewTertiary] = useState<Partial<TertiaryEducation>>(
    {}
  );
  const [showQualificationForm, setShowQualificationForm] = useState(false);
  const [newQualification, setNewQualification] = useState<
    Partial<Qualification>
  >({});
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const examTypes = useMemo(
    () => ["WAEC", "NECO", "NABTEB", "GCE", "IGCSE", "Other"],
    []
  );

  const schoolTypes = useMemo(
    () => ["Public", "Private", "Federal", "State", "Mission", "Other"],
    []
  );

  const certificateTypes = useMemo(
    () => [
      "First School Leaving Certificate",
      "Common Entrance",
      "Other",
      "None",
    ],
    []
  );

  const commonGrades = useMemo(
    () => ["A1", "B2", "B3", "C4", "C5", "C6", "D7", "E8", "F9"],
    []
  );

  const commonSubjects = useMemo(
    () => [
      "English Language",
      "Mathematics",
      "Physics",
      "Chemistry",
      "Biology",
      "Further Mathematics",
      "Economics",
      "Geography",
      "Government",
      "History",
      "Literature in English",
      "Christian Religious Studies",
      "Islamic Studies",
      "Agricultural Science",
      "Accounting",
      "Commerce",
      "Yoruba",
      "Igbo",
      "Hausa",
      "French",
      "Technical Drawing",
      "Food and Nutrition",
      "Visual Arts",
    ],
    []
  );

  const handlePrimaryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setCurrentPrimary((prev) => ({
        ...prev,
        [name]: ["startYear", "endYear"].includes(name)
          ? parseInt(value)
          : value,
      }));
    },
    []
  );

  const savePrimaryEducation = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      primaryEducation: currentPrimary as PrimaryEducation,
    }));
  }, [currentPrimary]);

  const handleSecondaryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setCurrentSecondary((prev) => ({
        ...prev,
        [name]: name === "completionYear" ? parseInt(value) : value,
      }));
    },
    []
  );

  const addSecondaryEducation = useCallback(() => {
    if (
      currentSecondary.examNumber &&
      currentSecondary.schoolName &&
      currentSecondary.grades?.length
    ) {
      setFormData((prev) => ({
        ...prev,
        secondarySchool: [
          ...prev.secondarySchool,
          currentSecondary as SecondaryEducation,
        ],
      }));
      setCurrentSecondary({
        examType: "WAEC",
        sitting: "first",
        schoolType: "Public",
        completionYear: new Date().getFullYear(),
        grades: [],
      });
    }
  }, [currentSecondary]);

  const removeSecondaryEducation = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      secondarySchool: prev.secondarySchool.filter((_, i) => i !== index),
    }));
  }, []);

  const handleSubjectChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setCurrentSubject((prev) => ({
        ...prev,
        [name]: name === "grade" ? value.toUpperCase() : value,
      }));
    },
    []
  );

  const addSubject = useCallback(() => {
    if (currentSubject.subject && currentSubject.grade) {
      setCurrentSecondary((prev) => ({
        ...prev,
        grades: [...(prev.grades || []), currentSubject],
      }));
      setCurrentSubject({ subject: "", grade: "" });
    }
  }, [currentSubject]);

  const removeSubject = useCallback((index: number) => {
    setCurrentSecondary((prev) => ({
      ...prev,
      grades: (prev.grades || []).filter((_, i) => i !== index),
    }));
  }, []);

  const handleTertiaryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setNewTertiary((prev) => ({
        ...prev,
        [name]: ["startYear", "endYear", "graduationYear"].includes(name)
          ? parseInt(value)
          : value,
      }));
    },
    []
  );

  const addTertiaryEducation = useCallback(() => {
    if (newTertiary.institution && newTertiary.degree) {
      setFormData((prev) => ({
        ...prev,
        tertiaryEducation: [
          ...prev.tertiaryEducation!,
          newTertiary as TertiaryEducation,
        ],
      }));
      setNewTertiary({});
      setShowTertiaryForm(false);
    }
  }, [newTertiary]);

  const removeTertiaryEducation = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      tertiaryEducation: prev.tertiaryEducation?.filter((_, i) => i !== index),
    }));
  }, []);

  const handleQualificationChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setNewQualification((prev) => ({
        ...prev,
        [name]: name === "yearObtained" ? parseInt(value) : value,
      }));
    },
    []
  );

  const addQualification = useCallback(() => {
    if (newQualification.name && newQualification.institution) {
      setFormData((prev) => ({
        ...prev,
        qualifications: [
          ...prev.qualifications!,
          newQualification as Qualification,
        ],
      }));
      setNewQualification({});
      setShowQualificationForm(false);
    }
  }, [newQualification]);

  const removeQualification = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      qualifications: prev.qualifications?.filter((_, i) => i !== index),
    }));
  }, []);

  const validate = useCallback((): boolean => {
    const newErrors: typeof errors = {};

    // Validate secondary education
    if (formData.secondarySchool.length === 0) {
      if (!currentSecondary.examNumber)
        newErrors.examNumber = "Exam number is required";
      if (!currentSecondary.schoolName)
        newErrors.schoolName = "School name is required";
      if (!currentSecondary.completionYear)
        newErrors.completionYear = "Completion year is required";
      if (!currentSecondary.grades || currentSecondary.grades.length < 5)
        newErrors.grades = "At least 5 subject grades are required";
    } else {
      // Validate all secondary education entries
      formData.secondarySchool.forEach((sec, index) => {
        if (sec.grades.length < 5)
          newErrors[`secondary-${index}-grades`] =
            "At least 5 subject grades are required";
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, currentSecondary]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (validate()) {
        let finalData: AcademicHistory;

        if (
          currentSecondary.examNumber &&
          currentSecondary.schoolName &&
          currentSecondary.grades &&
          currentSecondary.grades.length > 0 &&
          !formData.secondarySchool.some(
            (sec) =>
              sec.examNumber === currentSecondary.examNumber &&
              sec.schoolName === currentSecondary.schoolName
          )
        ) {
          finalData = {
            ...formData,
            secondarySchool: [
              ...formData.secondarySchool,
              currentSecondary as SecondaryEducation,
            ],
          };
        } else {
          finalData = formData;
        }

        updateData(finalData);
        nextStep();
      } else {
        console.log("Errors:", errors);
      }
    },
    [
      formData,
      currentSecondary,
      currentPrimary,
      validate,
      updateData,
      nextStep,
      errors,
    ]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-md space-y-6 md:space-y-8"
    >
      <h2 className="text-xl md:text-2xl font-bold text-green-800 border-b-2 border-yellow-600 pb-2 md:pb-3">
        Academic History
      </h2>

      {/* Primary Education Section (Optional) */}
      <div className="space-y-4 md:space-y-6">
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-green-800 mb-3 md:mb-4">
            Primary Education*
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                School Name
              </label>
              <input
                type="text"
                name="schoolName"
                value={currentPrimary.schoolName || ""}
                onChange={handlePrimaryChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-green-800 focus:ring-2 focus:ring-green-600"
                placeholder="e.g., Central Primary School"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Certificate Type
              </label>
              <select
                name="certificateType"
                value={currentPrimary.certificateType || ""}
                onChange={handlePrimaryChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-green-800 focus:ring-2 focus:ring-green-600"
              >
                <option value="">Select Certificate</option>
                {certificateTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Year
              </label>
              <input
                type="number"
                name="startYear"
                min="1980"
                max={new Date().getFullYear()}
                value={currentPrimary.startYear || ""}
                onChange={handlePrimaryChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-green-800 focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Year
              </label>
              <input
                type="number"
                name="endYear"
                min="1980"
                max={new Date().getFullYear()}
                value={currentPrimary.endYear || ""}
                onChange={handlePrimaryChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-green-800 focus:ring-2 focus:ring-green-600"
              />
            </div>
          </div>
          {/* 
          <button
            type="button"
            onClick={savePrimaryEducation}
            className="px-4 py-2 bg-[#017840] text-white rounded-md hover:bg-blue-700 text-sm md:text-base"
          >
            Save Primary Education
          </button> */}
        </div>

        {/* Secondary Education Section */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-green-800 mb-3 md:mb-4">
            Secondary Education (WAEC/NECO)*
          </h3>
          <p className="text-sm text-gray-600 mb-4 md:mb-6">
            Please provide details of your secondary education. You can add
            multiple exam sittings if applicable.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Exam Type *
              </label>
              <select
                name="examType"
                value={currentSecondary.examType || ""}
                onChange={handleSecondaryChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-green-800 focus:ring-2 focus:ring-green-600"
              >
                {examTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Exam Number *
              </label>
              <input
                type="text"
                name="examNumber"
                value={currentSecondary.examNumber || ""}
                onChange={handleSecondaryChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-green-800 focus:ring-2 focus:ring-green-600"
                placeholder="e.g., 4251907013"
              />
              {errors.examNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.examNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                School Name *
              </label>
              <input
                type="text"
                name="schoolName"
                value={currentSecondary.schoolName || ""}
                onChange={handleSecondaryChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-green-800 focus:ring-2 focus:ring-green-600"
                placeholder="e.g., King's College, Lagos"
              />
              {errors.schoolName && (
                <p className="mt-1 text-sm text-red-600">{errors.schoolName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                School Type *
              </label>
              <select
                name="schoolType"
                value={currentSecondary.schoolType || ""}
                onChange={handleSecondaryChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-green-800 focus:ring-2 focus:ring-green-600"
              >
                {schoolTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year of Completion *
              </label>
              <input
                type="number"
                name="completionYear"
                min="1980"
                max={new Date().getFullYear()}
                value={currentSecondary.completionYear || ""}
                onChange={handleSecondaryChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-green-800 focus:ring-2 focus:ring-green-600"
              />
              {errors.completionYear && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.completionYear}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Exam Sitting *
              </label>
              <select
                name="sitting"
                value={currentSecondary.sitting || "first"}
                onChange={handleSecondaryChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-green-800 focus:ring-2 focus:ring-green-600"
              >
                <option value="first">First Sitting</option>
                <option value="second">Second Sitting</option>
              </select>
            </div>
          </div>

          {/* Subjects and Grades */}
          <div className="mt-6 md:mt-8">
            <h4 className="text-md font-medium text-gray-700 mb-3">
              Subjects and Grades * (Minimum of 5 subjects including English and
              Mathematics)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select
                  name="subject"
                  value={currentSubject.subject}
                  onChange={handleSubjectChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:border-green-800 focus:ring-2 focus:ring-green-600"
                >
                  <option value="">Select Subject</option>
                  {commonSubjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grade
                </label>
                <select
                  name="grade"
                  value={currentSubject.grade}
                  onChange={handleSubjectChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:border-green-800 focus:ring-2 focus:ring-green-600"
                >
                  <option value="">Select Grade</option>
                  {commonGrades.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={addSubject}
                  className="w-full px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 text-sm md:text-base"
                >
                  Add Subject
                </button>
              </div>
            </div>

            {errors.grades && (
              <p className="mt-1 text-sm text-red-600">{errors.grades}</p>
            )}

            {/* List of added subjects */}
            <div className="mt-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">
                Added Subjects:
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {currentSecondary.grades?.map((subject, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm"
                  >
                    <span>
                      {subject.subject} - {subject.grade}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeSubject(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-6">
            <button
              type="button"
              onClick={addSecondaryEducation}
              className="px-4 py-2 bg-[#017840] text-white rounded-md hover:bg-blue-700 text-sm md:text-base"
            >
              Add Exam Sitting
            </button>
          </div>
        </div>

        {/* List of added secondary education */}
        {formData.secondarySchool.length > 0 && (
          <div className="mt-6 md:mt-8">
            <h4 className="text-md md:text-lg font-medium text-gray-700 mb-3">
              Added Exam Details:
            </h4>
            {formData.secondarySchool.map((sec, index) => (
              <div
                key={index}
                className="p-3 md:p-4 border border-gray-200 rounded-md mb-3 md:mb-4 text-sm md:text-base"
              >
                <div className="flex justify-between items-center">
                  <h5 className="font-medium">
                    {sec.examType} - {sec.schoolName}
                  </h5>
                  <button
                    type="button"
                    onClick={() => removeSecondaryEducation(index)}
                    className="text-red-600 hover:text-red-800 text-sm md:text-base"
                  >
                    Remove
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  Exam Number: {sec.examNumber}
                </p>
                <p className="text-sm text-gray-600">
                  Year: {sec.completionYear}
                </p>
                <p className="text-sm text-gray-600">
                  Sitting: {sec.sitting === "first" ? "First" : "Second"}
                </p>
                <p className="text-sm text-gray-600">
                  Subjects: {sec.grades.map((g) => g.subject).join(", ")}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tertiary Education Section (Optional) */}
        <div className="mt-6 md:mt-8">
          <h3 className="text-lg md:text-xl font-semibold text-green-800 mb-3 md:mb-4">
            Tertiary Education (Optional)
          </h3>

          {!showTertiaryForm ? (
            <button
              type="button"
              onClick={() => setShowTertiaryForm(true)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm md:text-base"
            >
              + Add Tertiary Education
            </button>
          ) : (
            <div className="p-3 md:p-4 border border-gray-200 rounded-md mb-4">
              <h4 className="font-medium mb-3">Add Tertiary Education</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Institution Name"
                  name="institution"
                  value={newTertiary.institution || ""}
                  onChange={handleTertiaryChange}
                  className="p-2 border border-gray-300 rounded-md text-sm md:text-base"
                />
                <input
                  type="text"
                  placeholder="Degree/Diploma"
                  name="degree"
                  value={newTertiary.degree || ""}
                  onChange={handleTertiaryChange}
                  className="p-2 border border-gray-300 rounded-md text-sm md:text-base"
                />
                <input
                  type="text"
                  placeholder="Field of Study"
                  name="fieldOfStudy"
                  value={newTertiary.fieldOfStudy || ""}
                  onChange={handleTertiaryChange}
                  className="p-2 border border-gray-300 rounded-md text-sm md:text-base"
                />
                <input
                  type="number"
                  placeholder="Start Year"
                  name="startYear"
                  value={newTertiary.startYear || ""}
                  onChange={handleTertiaryChange}
                  className="p-2 border border-gray-300 rounded-md text-sm md:text-base"
                />
                <input
                  type="number"
                  placeholder="End Year"
                  name="endYear"
                  value={newTertiary.endYear || ""}
                  onChange={handleTertiaryChange}
                  className="p-2 border border-gray-300 rounded-md text-sm md:text-base"
                />
                <select
                  name="isCompleted"
                  value={newTertiary.isCompleted ? "true" : "false"}
                  onChange={(e) =>
                    setNewTertiary((prev) => ({
                      ...prev,
                      isCompleted: e.target.value === "true",
                    }))
                  }
                  className="p-2 border border-gray-300 rounded-md text-sm md:text-base"
                >
                  <option value="true">Completed</option>
                  <option value="false">In Progress</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={addTertiaryEducation}
                  className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 text-sm md:text-base"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowTertiaryForm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm md:text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* List of added tertiary education */}
          {formData.tertiaryEducation!.length > 0 && (
            <div className="mt-4">
              {formData.tertiaryEducation?.map((tertiary, index) => (
                <div
                  key={index}
                  className="p-3 md:p-4 border border-gray-200 rounded-md mb-2 text-sm md:text-base"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-medium">{tertiary.institution}</h5>
                      <p className="text-sm text-gray-600">
                        {tertiary.degree} in {tertiary.fieldOfStudy}
                      </p>
                      <p className="text-sm text-gray-600">
                        {tertiary.startYear} -{" "}
                        {tertiary.isCompleted ? tertiary.endYear : "Present"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeTertiaryEducation(index)}
                      className="text-red-600 hover:text-red-800 text-sm md:text-base"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Qualifications Section (Optional) */}
        <div className="mt-6 md:mt-8">
          <h3 className="text-lg md:text-xl font-semibold text-green-800 mb-3 md:mb-4">
            Other Qualifications (Optional)
          </h3>

          {!showQualificationForm ? (
            <button
              type="button"
              onClick={() => setShowQualificationForm(true)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm md:text-base"
            >
              + Add Qualification
            </button>
          ) : (
            <div className="p-3 md:p-4 border border-gray-200 rounded-md mb-4">
              <h4 className="font-medium mb-3">Add Qualification</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Qualification Name"
                  name="name"
                  value={newQualification.name || ""}
                  onChange={handleQualificationChange}
                  className="p-2 border border-gray-300 rounded-md text-sm md:text-base"
                />
                <input
                  type="text"
                  placeholder="Institution"
                  name="institution"
                  value={newQualification.institution || ""}
                  onChange={handleQualificationChange}
                  className="p-2 border border-gray-300 rounded-md text-sm md:text-base"
                />
                <input
                  type="text"
                  placeholder="Type (e.g., Professional)"
                  name="type"
                  value={newQualification.type || ""}
                  onChange={handleQualificationChange}
                  className="p-2 border border-gray-300 rounded-md text-sm md:text-base"
                />
                <input
                  type="number"
                  placeholder="Year Obtained"
                  name="yearObtained"
                  value={newQualification.yearObtained || ""}
                  onChange={handleQualificationChange}
                  className="p-2 border border-gray-300 rounded-md text-sm md:text-base"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={addQualification}
                  className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 text-sm md:text-base"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowQualificationForm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm md:text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* List of added qualifications */}
          {formData.qualifications!.length > 0 && (
            <div className="mt-4">
              {formData.qualifications?.map((qualification, index) => (
                <div
                  key={index}
                  className="p-3 md:p-4 border border-gray-200 rounded-md mb-2 text-sm md:text-base"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-medium">{qualification.name}</h5>
                      <p className="text-sm text-gray-600">
                        {qualification.institution}
                      </p>
                      <p className="text-sm text-gray-600">
                        {qualification.type}{" "}
                        {qualification.yearObtained &&
                          `- ${qualification.yearObtained}`}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeQualification(index)}
                      className="text-red-600 hover:text-red-800 text-sm md:text-base"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-between pt-4 md:pt-6 mt-6 md:mt-8 border-t border-gray-200 gap-4 md:gap-0">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm md:text-base"
        >
          ← Back
        </button>
        <button
          type="submit"
          onClick={savePrimaryEducation}
          className="px-6 py-2.5 bg-green-800 text-white rounded-md hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 text-sm md:text-base"
        >
          Next: Program Selection →
        </button>
      </div>
    </form>
  );
};

export default React.memo(AcademicHistoryForm);
