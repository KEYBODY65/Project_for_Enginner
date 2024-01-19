import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const useCsrfToken = () => {
  useEffect(() => {
    const csrfToken = Cookies.get('csrfToken');
    console.log(csrfToken); // Вывод CSRF-токена в консоль
  }, []);

};


