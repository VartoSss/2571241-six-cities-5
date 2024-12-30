import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { loginAction } from '../../store/api-actions';

interface FormData {
  email: string;
  password: string;
}

export function LogInForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (formData.email.length > 0 && formData.password.length > 0) {
      dispatch(
        loginAction({
          email: formData.email,
          password: formData.password,
        })
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login__form form">
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className="login__input form__input"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className="login__input form__input"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </div>
      <button className="login__submit form__submit button" type="submit">
        Sign in
      </button>
    </form>
  );
}