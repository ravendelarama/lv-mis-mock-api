"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const faker_1 = require("@faker-js/faker");
exports.seed = {
    student: async (count) => {
        const seeds = Array();
        for (let i = 1; i <= count; i++) {
            const firstName = faker_1.faker.person.firstName();
            const middleName = faker_1.faker.person.middleName();
            const lastName = faker_1.faker.person.lastName();
            const schoolId = `21-${String(i).padStart(5, "0")}${faker_1.faker.string.alpha({
                length: 3,
                casing: "upper",
            })}`;
            const newStudent = {
                firstName,
                middleName,
                lastName,
                schoolId,
                email: `${firstName.toLowerCase()}${lastName.toLowerCase()}@student.laverdad.edu.ph`,
                irregular: false,
            };
            seeds.push(newStudent);
        }
        return [...seeds];
    },
    instructor: async (count) => {
        const seeds = Array();
        for (count; count > 0; count--) {
            const firstName = faker_1.faker.person.firstName();
            const middleName = faker_1.faker.person.middleName();
            const lastName = faker_1.faker.person.lastName();
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
