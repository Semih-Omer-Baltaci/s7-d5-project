import React, { useState, useEffect } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';




const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [isValid, setIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Email validasyonu için regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Şifre validasyonu için regex (en az 8 karakter, 1 büyük harf, 1 küçük harf, 1 rakam)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: ''
    };

    // Email validasyonu
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Geçerli bir email adresi giriniz';
    }

    // Şifre validasyonu
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Şifre en az 8 karakter, 1 büyük harf, 1 küçük harf ve 1 rakam içermelidir';
    }

    setErrors(newErrors);

    // Form geçerli mi kontrolü
    const isFormValid = 
      emailRegex.test(formData.email) && 
      passwordRegex.test(formData.password) && 
      formData.acceptTerms;
    
    setIsValid(isFormValid);
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      console.log('Form gönderildi:', formData);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Şifre
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="acceptTerms"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 rounded border-gray-300"
          />
          <label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-700">
            Şartları kabul ediyorum
          </label>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-2 px-4 rounded-md text-white ${
            isValid
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
};

export default LoginForm;