
import { faker } from "@faker-js/faker";
export default (user,count,courseNameIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
stuName: faker.lorem.sentence(""),
DOB: faker.lorem.sentence(""),
courseName: courseNameIds[i % courseNameIds.length],
address: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
