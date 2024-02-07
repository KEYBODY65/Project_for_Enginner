import React from 'react';
import {connect} from "react-redux";
import {Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = (isAuthenticated) => {

  const location = useLocation(); // получаем текущий маршрут с помощью хука useLocation()

  return (
    // если пользователь авторизован, то рендерим дочерние элементы текущего маршрута, используя компонент Outlet
    isAuthenticated === true ?
      <Outlet />
      // если пользователь не авторизован, то перенаправляем его на маршрут /login с помощью компонента Navigate
      // свойство replace указывает, что текущий маршрут будет заменен на новый, чтобы пользователь не мог вернуться
      // обратно, используя кнопку "назад" в браузере.
      :
      <Navigate to="/teacher/auth" state={{ from: location }} replace />
  );
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);
