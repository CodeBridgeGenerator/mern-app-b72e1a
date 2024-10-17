
import { faker } from "@faker-js/faker";
export default (user,count,depNameIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
courseName: faker.lorem.sentence(1),
depName: depNameIds[i % depNameIds.length],
lecturer: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
