///////////////////////////////////////
//// DOM-related Utilities & Types ////
///////////////////////////////////////

export function querySelector(selector: string) {
    return document.querySelector(selector) as Element;
}

export function querySelectorAll(selector: string) {
    return document.querySelectorAll(selector) as NodeListOf<Element>;
}

export function toggleClass(element: Element, styleClass: string) {
    element.classList.toggle(styleClass);
}

/////////////////////////////////////////
//// Maths-related Utilities & Types ////
/////////////////////////////////////////

type Bound = [number, number];
type Vec2 = [number, number];

export function mod(dividend: number, divisor: number) {
    return ((dividend % divisor) + divisor) % divisor;
}

export function randPosInt(range: number) {
    return Math.floor(Math.random() * range);
}

export function randInt([leftBound, rightBound]: Bound) {
    const range = Math.abs(rightBound) + Math.abs(leftBound);
    const centeredRandInt = randPosInt(range);
    return centeredRandInt + leftBound;
}

export function randPosVec2(xRange: number, yRange: number): Vec2 {
    return [randPosInt(xRange), randPosInt(yRange)];
}

export function randVec2(xBounds: Bound, yBounds: Bound): Vec2 {
    return [randInt(xBounds), randInt(yBounds)];
}

///////////////////////////////////////////
//// Spatial-related Utilities & Types ////
///////////////////////////////////////////

type Coordinate2D = [number, number];
type Coordinate3D = [number, number, number];

function coord2ToId(coordinate: Coordinate2D) {
    return coordinate.join("-");
}

function idToCoord2(id: string) {
    return id.split("-").map(Number) as Coordinate2D;
}

function coord3ToId(coordinate: Coordinate3D) {
    return coordinate.join("-");
}

function idToCoord3(id: string) {
    return id.split("-").map(Number) as Coordinate3D;
}

type Entity2D = {
    position: Coordinate2D;
};

type Entity3D = {
    position: Coordinate3D;
};

/////////////////////////////////////////
//// Logic-related Utilities & Types ////
/////////////////////////////////////////

type ImpurePredicate<T> = (...args: Array<T>) => boolean;

class Predicate<T> {
    static eval<T>(predicate: Predicate<T>, values: Array<any>) {
        return predicate.atoms.reduce((accum, atom) => {
            return accum;
        });
    }

    atoms: Array<boolean | Predicate<T> | ImpurePredicate<T>>;

    constructor(...atoms: Array<boolean | Predicate<T> | ImpurePredicate<T>>) {
        this.atoms = atoms;
    }

    and(
        ...atoms: Array<boolean | Predicate<T> | ImpurePredicate<T>>
    ): ImpurePredicate<T> {
        return (...values: Array<any>) => {
            let output = false;
            for (const atom of atoms) {
                if (atom instanceof Predicate) {
                    output = output && Predicate.eval(atom, values);
                } else if (typeof atom === "boolean") {
                    output = output && atom;
                } else {
                    output = output && atom(...values);
                }
            }

            return output;
        };
    }

    or() {}
}

function not<T>(
    atom: boolean | Predicate<T> | ImpurePredicate<T>
): ImpurePredicate<T> {
    if (atom instanceof Predicate) {
        return () => !Predicate.eval(atom);
    } else if (typeof atom === "boolean") {
        return () => !atom;
    } else {
        return (...values: Array<any>) => !atom(...values);
    }
}
