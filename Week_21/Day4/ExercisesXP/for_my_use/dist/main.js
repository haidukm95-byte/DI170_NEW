"use strict";
/* Create a class HK_CR wihch includes next properties:
private name;
public occupation;
public position;

create a method getEmployeeInfo() which returns all the properties
 */
Object.defineProperty(exports, "__esModule", { value: true });
class HK_CR {
    name;
    department;
    position;
    constructor(name, department, position) {
        this.name = name;
        this.department = department;
        this.position = position;
    }
    ;
    getEmployeeInfo() {
        return `Name: ${this.name};
                Department: ${this.department};
                Position: ${this.position}`;
    }
}
const workers = {
    vala: new HK_CR("Valentina Marciano", "Housekeeping Management", "Head Manager"),
    ezz: new HK_CR("Ezzaldin Serhan", "Housekeeping Management", "Vice Manager"),
    tanya: new HK_CR("Tatiana Bagliuk", "Housekeeping Management", "Dispatcher"),
    maria: new HK_CR("Maria Karajin", "Uniform Warehouse", "Uniform Warehouse Manager"),
    shehinez: new HK_CR("Shehinez Abdallah", "Uniform Warehouse", "Uniform Warehouse Manager"),
    fredi: new HK_CR("Fredi Shaulov", "Rooms", "Supervisor"),
    lida: new HK_CR("Lidiya Markova", "Rooms", "Supervisor"),
    vanessa: new HK_CR("Vanessa Salatat", "Rooms", "Supervisor"),
    ray: new HK_CR("Ray Macalintal", "Rooms", "Supervisor"),
    farah: new HK_CR("Farah Karajin", "Rooms", "Supervisor"),
    shams: new HK_CR("Shams Abdallah", "Rooms", "Supervisor"),
    wael: new HK_CR("Wael Zaghari", "Public areas", "Public areas responsible manager"),
    hussein: new HK_CR("Hussein Nijem", "Public areas", "Supervisor"),
    yan = new HK_CR("Yan Markov", "Rooms", "Self-inspecting housekeeper"),
    clarisse = new HK_CR("Clarisse Licodin", "Rooms", "Housekeeper"),
    angela = new HK_CR("Angelica", "Rooms", "Housekeeper"),
    grace = new HK_CR("Mary Grace Pnuyang", "Rooms", "Housekeeper"),
    janice = new HK_CR("Janice", "Rooms", "Housekeeper"),
    michelle = new HK_CR("Michelle Polig", "Rooms", "Housekeeper"),
    mylene = new HK_CR("Mylene", "Rooms", "Housekeeper"),
    lorena = new HK_CR("Lorena", "Rooms", "Housekeeper"),
    sangeeth = new HK_CR("Sangeeth", "Rooms", "Housekeeper"),
    tharindu = new HK_CR("Tharindu", "Rooms", "Housekeeper"),
    indika = new HK_CR("Indika", "Rooms", "Housekeeper"),
    nissanka = new HK_CR("Nissanka", "Rooms", "Housekeeper"),
    stella = new HK_CR("Stella", "Rooms", "Housekeeper"),
    janelyn = new HK_CR("Janelyn", "Rooms", "Housekeeper"),
    reynero = new HK_CR("Reynero", "Rooms", "Housekeeper"),
    virginia = new HK_CR("Virginia Manguine", "Rooms", "Housekeeper"),
    chanda = new HK_CR("Chanda", "Rooms", "Housekeeper"),
    murad = new HK_CR("Murad Tirhi", "Rooms", "Houseman"),
    khalifa = new HK_CR("Khalifa Wad", "Rooms", "Houseman"),
    moen = new HK_CR("Moen Abdallah", "Rooms", "Houseman"),
    randy = new HK_CR("Randy Palileo", "Rooms", "Houseman"),
    marko = new HK_CR("Marko Haiduk", "Rooms", "Houseman"),
    fadel = new HK_CR("Ahmad Fadel", "Public areas", "Restaurant cleaning worker"),
    wesena = new HK_CR("Wesena", "Public areas", "Spa rooms keeping worker"),
    hudaifa = new HK_CR("Hudaifa Abdallah", "Public areas", "Public areas worker"),
    abed = new HK_CR("Abed", "Public areas", "Public areas worker"),
    brics = new HK_CR("Jose Manguiat", "Public areas", "Public areas worker"),
    nishantha = new HK_CR("Pradeep Nishantha", "Public areas", "Public areas worker"),
    shweiki = new HK_CR("Mohammad Shweiki", "Public areas", "Public areas worker"),
    barzaf = new HK_CR("Barzaf", "Public areas", "Spa rooms keeping worker"),
    radovan = new HK_CR("Radovan Karajin", "Laundry", "Laundry Supervisor"),
    jeph = new HK_CR("Jeph", "Laundry", "Laundry Worker"),
    isuru = new HK_CR("Isuru Lakshitha", "Laundry", "Laundry Worker"),
    razi = new HK_CR("Razi Barhoum", "Swimming Pools", "Swimming Pools area worker"),
    emmarie = new HK_CR("Emmarie Penaflor", "Swimming Pools", "Swimming Pools area worker"),
    mahmoud = new HK_CR("Mahmoud Serhan", "Swimming Pools", "Swimming Pools area worker")
};
//# sourceMappingURL=main.js.map