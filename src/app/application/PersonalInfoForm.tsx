// components/application/PersonalInfoForm.tsx
"use client";

import React, { useState, useId, useEffect } from "react";
import type { PersonalInfo } from "./new_application";
import NigerianStates from "./nigerianStates";
import { User, Calendar, Flag, ChevronRight, AlertCircle } from "lucide-react";

interface PersonalInfoFormProps {
  data?: Partial<PersonalInfo>;
  updateData: (data: PersonalInfo) => void;
  nextStep: () => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  data,
  updateData,
  nextStep,
}) => {
  const [formData, setFormData] = useState<PersonalInfo>({
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    middleName: data?.middleName || "",
    dateOfBirth: data?.dateOfBirth || new Date(),
    gender: data?.gender || "Male",
    nationality: data?.nationality || "Nigerian",
    countryOfResidence: data?.countryOfResidence || "Nigeria",
    isNigerian: data?.isNigerian ?? true,
    stateOfOrigin: data?.stateOfOrigin || "",
    localGovernment: data?.localGovernment || "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof PersonalInfo, string>>
  >({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof PersonalInfo, boolean>>
  >({});

  const stateSelectId = useId();
  const lgaSelectId = useId();

  // Calculate minimum date (14 years ago)
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 14);
  const minDateString = minDate.toISOString().split("T")[0];

  useEffect(() => {
    // Validate date of birth if it's set and touched
    if (touched.dateOfBirth && formData.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(formData.dateOfBirth);
      const age = today.getFullYear() - birthDate.getFullYear();

      if (age < 14) {
        setErrors((prev) => ({
          ...prev,
          dateOfBirth: "You must be at least 14 years old",
        }));
      } else if (errors.dateOfBirth === "You must be at least 14 years old") {
        // Clear the error if it was previously set
        const newErrors = { ...errors };
        delete newErrors.dateOfBirth;
        setErrors(newErrors);
      }
    }
  }, [formData.dateOfBirth, touched.dateOfBirth, errors]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    const updatedData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };

    // If state changes, reset LGA
    if (name === "stateOfOrigin") {
      updatedData.localGovernment = "";
    }

    setFormData(updatedData);

    // Clear error when field is updated
    if (errors[name as keyof PersonalInfo]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (field: keyof PersonalInfo) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: newDate,
    }));

    // Validate age
    const today = new Date();
    const age = today.getFullYear() - newDate.getFullYear();

    if (age < 14) {
      setErrors((prev) => ({
        ...prev,
        dateOfBirth: "You must be at least 14 years old",
      }));
    } else if (errors.dateOfBirth) {
      setErrors((prev) => ({ ...prev, dateOfBirth: undefined }));
    }
  };

  const handleNigerianToggle = (isNigerian: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isNigerian,
      nationality: isNigerian ? "Nigerian" : "",
      countryOfResidence: isNigerian ? "Nigeria" : "",
      stateOfOrigin: isNigerian ? prev.stateOfOrigin : "",
      localGovernment: isNigerian ? prev.localGovernment : "",
    }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof PersonalInfo, string>> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    // Date of birth validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const today = new Date();
      const birthDate = new Date(formData.dateOfBirth);
      const age = today.getFullYear() - birthDate.getFullYear();

      if (age < 14) {
        newErrors.dateOfBirth = "You must be at least 14 years old";
      }
    }

    if (!formData.isNigerian) {
      if (!formData.nationality?.trim())
        newErrors.nationality = "Nationality is required";
      if (!formData.countryOfResidence?.trim())
        newErrors.countryOfResidence = "Country of residence is required";
    } else {
      if (!formData.stateOfOrigin)
        newErrors.stateOfOrigin = "State of origin is required";
      if (!formData.localGovernment)
        newErrors.localGovernment = "Local government area is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mark all fields as touched on submit
    const allFields: (keyof PersonalInfo)[] = [
      "firstName",
      "lastName",
      "dateOfBirth",
      "gender",
      "nationality",
      "countryOfResidence",
      "stateOfOrigin",
      "localGovernment",
    ];
    const newTouched: Partial<Record<keyof PersonalInfo, boolean>> = {};
    allFields.forEach((field) => {
      newTouched[field] = true;
    });
    setTouched(newTouched);

    if (validate()) {
      console.log("=== PERSONAL INFO FORM DATA ===");
      console.log("Form Data to be passed:", formData);
      console.log("Form Data (formatted):", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        middleName: formData.middleName,
        dateOfBirth: formData.dateOfBirth?.toISOString().split("T")[0],
        gender: formData.gender,
        isNigerian: formData.isNigerian,
        nationality: formData.nationality,
        countryOfResidence: formData.countryOfResidence,
        stateOfOrigin: formData.stateOfOrigin,
        localGovernment: formData.localGovernment,
      });
      console.log("=== END PERSONAL INFO ===");

      updateData(formData);
      nextStep();
    } else {
      console.log("=== FORM VALIDATION FAILED ===");
      console.log("Errors:", errors);
      console.log("Current form data:", formData);
    }
  };

  // Get LGAs for selected state
  const getLgasForState = () => {
    if (!formData.stateOfOrigin) return [];
    const state = NigerianStates.find(
      (state) => state.name === formData.stateOfOrigin
    );
    return state ? state.lgas : [];
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-4 md:p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-5 md:mb-8 text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#017840] mb-2">
          Personal Information
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 px-2">
          Please provide your personal details to continue with your application
        </p>
        <div className="w-14 md:w-24 h-1 bg-[#BD9946] mx-auto mt-2 md:mt-4 rounded-full"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 md:space-y-8">
        {/* Name Section */}
        <div className="bg-gray-50 p-3 sm:p-4 md:p-6 rounded-lg">
          <div className="flex items-center mb-3">
            <div className="p-1.5 bg-[#017840] rounded-full mr-2">
              <User className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
              Name Information
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={() => handleBlur("firstName")}
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#017840] focus:border-transparent transition-all text-sm sm:text-base`}
                placeholder="Enter your first name"
              />
              {touched.firstName && errors.firstName && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" /> {errors.firstName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={() => handleBlur("lastName")}
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#017840] focus:border-transparent transition-all text-sm sm:text-base`}
                placeholder="Enter your last name"
              />
              {touched.lastName && errors.lastName && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" /> {errors.lastName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Middle Name
              </label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#017840] focus:border-transparent transition-all text-sm sm:text-base"
                placeholder="Enter your middle name"
              />
            </div>
          </div>
        </div>

        {/* Personal Details Section */}
        <div className="bg-gray-50 p-3 sm:p-4 md:p-6 rounded-lg">
          <div className="flex items-center mb-3">
            <div className="p-1.5 bg-[#017840] rounded-full mr-2">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
              Personal Details
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Date of Birth *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                max={minDateString}
                value={
                  formData.dateOfBirth
                    ? formData.dateOfBirth.toISOString().split("T")[0]
                    : ""
                }
                onChange={handleDateChange}
                onBlur={() => handleBlur("dateOfBirth")}
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#017840] focus:border-transparent transition-all text-sm sm:text-base`}
              />
              {touched.dateOfBirth && errors.dateOfBirth && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" /> {errors.dateOfBirth}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Gender *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#017840] focus:border-transparent transition-all text-sm sm:text-base appearance-none bg-white bg-select-arrow bg-no-repeat bg-[center_right_0.75rem]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                }}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Nationality Section */}
        <div className="bg-gray-50 p-3 sm:p-4 md:p-6 rounded-lg">
          <div className="flex items-center mb-3">
            <div className="p-1.5 bg-[#017840] rounded-full mr-2">
              <Flag className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
              Nationality Information
            </h2>
          </div>

          <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center">
              <input
                type="radio"
                id="nigerian"
                name="isNigerian"
                checked={formData.isNigerian}
                onChange={() => handleNigerianToggle(true)}
                className="h-4 w-4 text-[#017840] focus:ring-[#017840] border-gray-300"
              />
              <label
                htmlFor="nigerian"
                className="ml-2 block text-xs sm:text-sm font-medium text-gray-700"
              >
                I am a Nigerian citizen
              </label>
            </div>

            <div className="flex items-center mt-2">
              <input
                type="radio"
                id="foreign"
                name="isNigerian"
                checked={!formData.isNigerian}
                onChange={() => handleNigerianToggle(false)}
                className="h-4 w-4 text-[#017840] focus:ring-[#017840] border-gray-300"
              />
              <label
                htmlFor="foreign"
                className="ml-2 block text-xs sm:text-sm font-medium text-gray-700"
              >
                I am an international applicant
              </label>
            </div>
          </div>

          {formData.isNigerian ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              <div className="relative">
                <label
                  htmlFor={stateSelectId}
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                >
                  State of Origin *
                </label>
                <div className="relative">
                  <select
                    id={stateSelectId}
                    name="stateOfOrigin"
                    value={formData.stateOfOrigin}
                    onChange={handleChange}
                    onBlur={() => handleBlur("stateOfOrigin")}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      errors.stateOfOrigin
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-[#017840] focus:border-transparent transition-all text-sm sm:text-base appearance-none bg-white bg-select-arrow bg-no-repeat bg-[center_right_0.75rem] pr-8`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    }}
                  >
                    <option value="">Select State</option>
                    {NigerianStates.map((state) => (
                      <option key={state.name} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
                {touched.stateOfOrigin && errors.stateOfOrigin && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />{" "}
                    {errors.stateOfOrigin}
                  </p>
                )}
              </div>

              <div className="relative">
                <label
                  htmlFor={lgaSelectId}
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                >
                  Local Government Area *
                </label>
                <div className="relative">
                  <select
                    id={lgaSelectId}
                    name="localGovernment"
                    value={formData.localGovernment}
                    onChange={handleChange}
                    onBlur={() => handleBlur("localGovernment")}
                    disabled={!formData.stateOfOrigin}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      errors.localGovernment
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-[#017840] focus:border-transparent transition-all text-sm sm:text-base appearance-none bg-white bg-select-arrow bg-no-repeat bg-[center_right_0.75rem] pr-8 disabled:bg-gray-100 disabled:cursor-not-allowed`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    }}
                  >
                    <option value="">Select LGA</option>
                    {getLgasForState().map((lga) => (
                      <option key={lga} value={lga}>
                        {lga}
                      </option>
                    ))}
                  </select>
                </div>
                {touched.localGovernment && errors.localGovernment && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />{" "}
                    {errors.localGovernment}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Nationality *
                </label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  onBlur={() => handleBlur("nationality")}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors.nationality ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#017840] focus:border-transparent transition-all text-sm sm:text-base`}
                  placeholder="Your nationality"
                />
                {touched.nationality && errors.nationality && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />{" "}
                    {errors.nationality}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Country of Residence *
                </label>
                <input
                  type="text"
                  name="countryOfResidence"
                  value={formData.countryOfResidence}
                  onChange={handleChange}
                  onBlur={() => handleBlur("countryOfResidence")}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors.countryOfResidence
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#017840] focus:border-transparent transition-all text-sm sm:text-base`}
                  placeholder="Country where you live"
                />
                {touched.countryOfResidence && errors.countryOfResidence && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />{" "}
                    {errors.countryOfResidence}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="flex items-center justify-center w-full sm:w-auto px-4 py-2.5 bg-[#017840] text-white rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-[#BD9946] focus:ring-opacity-50 transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            Next: Contact Details
            <ChevronRight className="ml-1.5 h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
