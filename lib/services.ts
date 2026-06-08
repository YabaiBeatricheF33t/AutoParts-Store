import { users, parts, User, Part } from './store';

function LogExecution(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`[Service Logger] Вызван метод: ${propertyKey}`);
    return originalMethod.apply(this, args);
  };
  return descriptor;
}

export class UserService {
  @LogExecution
  static getAll(): User[] {
    return users;
  }
  
  @LogExecution
  static getById(id: string): User | undefined {
    return users.find(u => u.id === id);
  }
  
  @LogExecution
  static create(data: Omit<User, 'id'>): User {
    const newUser: User = { 
      ...data, 
      id: Date.now().toString()
    };
    users.push(newUser);
    return newUser;
  }
}

export class PartService {
  static getAll(): Part[] {
    return parts;
  }
}
