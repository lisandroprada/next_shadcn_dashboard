// Utilidades de autenticación mock para desarrollo
export type MockUser = {
  id: string;
  name: string;
  email: string;
};

const MOCK_USER: MockUser = {
  id: '1',
  name: 'Usuario Demo',
  email: 'demo@demo.com'
};

export function mockLogin(email: string, password: string): Promise<MockUser> {
  // Simula un login exitoso si el email es demo@demo.com
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === MOCK_USER.email && password === 'demo') {
        localStorage.setItem('mockUser', JSON.stringify(MOCK_USER));
        resolve(MOCK_USER);
      } else {
        reject(new Error('Credenciales inválidas'));
      }
    }, 500);
  });
}

export function mockLogout(): void {
  localStorage.removeItem('mockUser');
}

export function getMockUser(): MockUser | null {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('mockUser');
  return user ? JSON.parse(user) : null;
}
