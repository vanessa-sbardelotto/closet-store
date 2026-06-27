import { HttpInterceptorFn } from '@angular/common/http';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Requisição enviada:', req.method, req.url);
  const clonedRequest = req.clone({
    setHeaders: {
      'Content-Type': 'application/json'
    }
  });
  return next(clonedRequest);
};