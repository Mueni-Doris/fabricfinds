// Import your Prisma client
import { PrismaClient } from '@prisma/client';

// Create a Prisma client instance
const prisma = new PrismaClient();

async function getUsers() {
  try {
    // Fetch all users from the 'users' table
    const users = await prisma.users.findMany();
    console.log('All users:', users);
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    // Disconnect Prisma client to free resources
    await prisma.$disconnect();
  }
}

// Run the function
getUsers();

