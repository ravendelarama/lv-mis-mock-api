import { faker } from "@faker-js/faker";

export const seed = {
  student: async (count: number) => {
    const seeds = Array();

    for (let i = 1; i <= count; i++) {
      const firstName = faker.person.firstName();
      const middleName = faker.person.middleName();
      const lastName = faker.person.lastName();

      const studentSchoolId = `21-${String(i).padStart(
        5,
        "0"
      )}${faker.string.alpha({ length: 3, casing: "upper" })}`;

      const newStudent = {
        firstName,
        middleName,
        lastName,
        studentSchoolId,
        email: `${firstName.toLowerCase()}${lastName.toLowerCase()}@student.laverdad.edu.ph`,
        irregular: false,
      };

      seeds.push(newStudent);
    }

    return [...seeds];
  },
  instructor: async (count: number) => {
    const seeds = Array();

    for (count; count > 0; count--) {
      const firstName = faker.person.firstName();
      const middleName = faker.person.middleName();
      const lastName = faker.person.lastName();

      const newInstructor = {
        firstName,
        middleName,
        lastName,
        email: `${firstName.toLowerCase()}${lastName.toLowerCase()}@laverdad.edu.ph`,
      };

      seeds.push(newInstructor);
    }

    return [...seeds];
  },
};
