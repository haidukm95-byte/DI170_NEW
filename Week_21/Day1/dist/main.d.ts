/**type string */
/**type boolean */
/**type any - try not to use it as possible */
/**union type */
/** array type */
/** type object */
/** types */
/** type tuple */
type GenderType = string | number | boolean;
type User = {
    name: string;
    age: number;
    gender?: string | number;
};
declare let avg9999: User;
declare let unknown45: User;
/** type / interface */
interface UserI {
    name: string;
    age: number;
    gender?: string | number;
}
declare let arrUsers: User[];
/** functions */
declare const sum: (a: number, b: number | string) => number | string;
//# sourceMappingURL=main.d.ts.map