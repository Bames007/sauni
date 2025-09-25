import React, { useState, useCallback } from "react";
import type { ContactInfo, GuardianContact } from "./new_application";

interface ContactInfoFormProps {
  data?: Partial<ContactInfo>;
  updateData: (data: ContactInfo) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const ContactInfoForm: React.FC<ContactInfoFormProps> = ({
  data,
  updateData,
  nextStep,
  prevStep,
}) => {
  const [formData, setFormData] = useState<ContactInfo>({
    email: data?.email || "",
    phone: data?.phone || "",
    address: data?.address || "",
    city: data?.city || "",
    state: data?.state || "",
    country: data?.country || "",
    zipCode: data?.zipCode || "",
    guardianContact: data?.guardianContact || {
      fullName: "",
      relationship: "",
      phone: "",
      email: "",
    },
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactInfo, string>>
  >({});

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      if (name.startsWith("guardianContact.")) {
        const field = name.split(".")[1] as keyof GuardianContact;
        setFormData((prev) => ({
          ...prev,
          guardianContact: {
            ...prev.guardianContact,
            [field]: value,
          },
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    },
    []
  );

  const validate = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof ContactInfo, string>> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;

    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Please enter a valid email address";

    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!phoneRegex.test(formData.phone))
      newErrors.phone = "Please enter a valid phone number";

    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.zipCode) newErrors.zipCode = "Zip/Postal code is required";

    if (!formData.guardianContact.fullName)
      newErrors.guardianContact = "Guardian contact name is required";
    if (!formData.guardianContact.relationship)
      newErrors.guardianContact = "Guardian contact relationship is required";
    if (!formData.guardianContact.phone)
      newErrors.guardianContact = "Guardian contact phone is required";
    else if (!phoneRegex.test(formData.guardianContact.phone))
      newErrors.guardianContact =
        "Please enter a valid Guardian contact phone number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (validate()) {
        // Log the data before proceeding
        console.log("=== CONTACT INFO FORM DATA ===");
        console.log("Form Data to be passed:", formData);
        console.log("Form Data (formatted):", {
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          zipCode: formData.zipCode,
          guardianContact: {
            fullName: formData.guardianContact.fullName,
            relationship: formData.guardianContact.relationship,
            phone: formData.guardianContact.phone,
            email: formData.guardianContact.email,
          },
        });
        console.log("=== END CONTACT INFO ===");

        updateData(formData);
        nextStep();
      } else {
        console.log("=== CONTACT FORM VALIDATION FAILED ===");
        console.log("Errors:", errors);
        console.log("Current form data:", formData);
      }
    },
    [formData, validate, updateData, nextStep, errors]
  );

  // Mobile-optimized styles
  const inputClassName =
    "text-base mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:border-[#017840] focus:ring-2 focus:ring-[#BD9946] focus:ring-opacity-50 transition duration-200";
  const labelClassName = "block text-sm font-medium text-gray-800 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Debug info panel - only show in development */}
      {process.env.NODE_ENV === "development" && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">
            Debug Info (Development Only)
          </h3>
          <pre className="text-xs text-yellow-700 overflow-auto max-h-32">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      )}

      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 border-b-2 border-amber-600 pb-2 md:pb-3 mb-4 md:mb-6">
          Contact Information
        </h2>

        <div className="space-y-6">
          {/* Primary Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-semibold text-emerald-700 border-l-4 border-emerald-700 pl-2 md:pl-3 py-1">
              Primary Contact Details
            </h3>

            <div className="grid grid-cols-1 gap-4 md:gap-6">
              <div>
                <label className={labelClassName}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClassName}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className={labelClassName}>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClassName}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className={labelClassName}>Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={inputClassName}
                  placeholder="123 Main Street"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className={labelClassName}>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={inputClassName}
                    placeholder="New York"
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className={labelClassName}>State/Province *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={inputClassName}
                    placeholder="New York"
                  />
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                  )}
                </div>

                <div>
                  <label className={labelClassName}>Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={inputClassName}
                    placeholder="United States"
                  />
                  {errors.country && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.country}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClassName}>Zip/Postal Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={inputClassName}
                    placeholder="10001"
                  />
                  {errors.zipCode && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.zipCode}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Guardian Contact Section */}
          <div className="space-y-4 pt-4">
            <h3 className="text-lg md:text-xl font-semibold text-emerald-700 border-l-4 border-emerald-700 pl-2 md:pl-3 py-1">
              Guardian Contact
            </h3>

            <div className="grid grid-cols-1 gap-4 md:gap-6">
              <div>
                <label className={labelClassName}>Full Name *</label>
                <input
                  type="text"
                  name="guardianContact.fullName"
                  value={formData.guardianContact.fullName}
                  onChange={handleChange}
                  className={inputClassName}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className={labelClassName}>Relationship *</label>
                <input
                  type="text"
                  name="guardianContact.relationship"
                  value={formData.guardianContact.relationship}
                  onChange={handleChange}
                  className={inputClassName}
                  placeholder="Parent, Spouse, etc."
                />
              </div>

              <div>
                <label className={labelClassName}>Phone Number *</label>
                <input
                  type="tel"
                  name="guardianContact.phone"
                  value={formData.guardianContact.phone}
                  onChange={handleChange}
                  className={inputClassName}
                  placeholder="+1 (555) 987-6543"
                />
              </div>

              <div>
                <label className={labelClassName}>Email (Optional)</label>
                <input
                  type="email"
                  name="guardianContact.email"
                  value={formData.guardianContact.email || ""}
                  onChange={handleChange}
                  className={inputClassName}
                  placeholder="Guardian.contact@example.com"
                />
              </div>

              {errors.guardianContact && (
                <div>
                  <p className="text-sm text-red-600 bg-red-50 p-2 rounded-md">
                    {errors.guardianContact}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-4">
        <button
          type="button"
          onClick={prevStep}
          className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-base font-medium transition duration-200"
        >
          ← Back
        </button>
        <button
          type="submit"
          className="px-4 py-2 sm:px-6 sm:py-3 bg-emerald-700 text-white rounded-md hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-opacity-50 text-base font-medium transition duration-200"
        >
          Next: Academic History →
        </button>
      </div>
    </form>
  );
};

export default React.memo(ContactInfoForm);
