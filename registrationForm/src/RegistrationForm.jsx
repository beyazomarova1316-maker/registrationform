import { useState } from "react";

function RegistrationForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    interests: [],
    city: "",
    note: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { name, value, checked, type } = e.target;

    if (type === "checkbox") {
      setForm({
        ...form,
        interests: checked
          ? [...form.interests, value]
          : form.interests.filter((item) => item !== value),
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }

    setSuccess(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Ad daxil edin";
    }

    if (
      !form.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Düzgün email daxil edin";
    }

    if (form.password.length < 6) {
      newErrors.password =
        "Şifrə ən azı 6 simvol olmalıdır";
    }

    if (!form.gender) {
      newErrors.gender = "Cins seçin";
    }

    if (form.interests.length === 0) {
      newErrors.interests = "Ən azı bir seçim edin";
    }

    if (!form.city) {
      newErrors.city = "Şəhər seçin";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccess(true);
      console.log("Form məlumatları:", form);
    } else {
      setSuccess(false);
    }
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Qeydiyyat</h2>
      <p className="subtitle">
        Məlumatlarınızı daxil edin
      </p>

      <label>Ad</label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Adınızı yazın"
      />
      {errors.name && <p className="error">{errors.name}</p>}

      <label>Email</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="example@gmail.com"
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <label>Şifrə</label>
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Ən azı 6 simvol"
      />
      {errors.password && (
        <p className="error">{errors.password}</p>
      )}

      <label>Cins</label>
      <div className="options">
        <label>
          <input
            type="radio"
            name="gender"
            value="Kişi"
            checked={form.gender === "Kişi"}
            onChange={handleChange}
          />
          Kişi
        </label>

        <label>
          <input
            type="radio"
            name="gender"
            value="Qadın"
            checked={form.gender === "Qadın"}
            onChange={handleChange}
          />
          Qadın
        </label>
      </div>
      {errors.gender && (
        <p className="error">{errors.gender}</p>
      )}

      <label>Maraq dairələri</label>
      <div className="options">
        {["Proqramlaşdırma", "Dizayn", "İdman"].map(
          (interest) => (
            <label key={interest}>
              <input
                type="checkbox"
                value={interest}
                checked={form.interests.includes(interest)}
                onChange={handleChange}
              />
              {interest}
            </label>
          )
        )}
      </div>
      {errors.interests && (
        <p className="error">{errors.interests}</p>
      )}

      <label>Şəhər</label>
      <select
        name="city"
        value={form.city}
        onChange={handleChange}
      >
        <option value="">Şəhər seçin</option>
        <option value="Bakı">Bakı</option>
        <option value="Gəncə">Gəncə</option>
        <option value="Sumqayıt">Sumqayıt</option>
        <option value="Şəki">Şəki</option>
      </select>
      {errors.city && <p className="error">{errors.city}</p>}

      <label>Qeyd</label>
      <textarea
        name="note"
        value={form.note}
        onChange={handleChange}
        placeholder="Əlavə qeyd..."
        rows="3"
      />

      <button type="submit">Göndər</button>

      {success && (
        <p className="success">
          Form uğurla göndərildi!
        </p>
      )}
    </form>
  );
}

export default RegistrationForm;
