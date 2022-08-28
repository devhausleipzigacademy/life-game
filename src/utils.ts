///////////////////////////////////////
//// DOM-related Utilities & Types ////
///////////////////////////////////////

export function querySelector(selector: string) {
    return document.querySelector(selector) as HTMLElement;
}

export function querySelectorAll(selector: string) {
    return document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
}

export function getRoot() {
    return document.documentElement as HTMLElement;
}

export function setCSSVar(CSSVar: string, value: string | number) {
    const root = getRoot();
    root.style.setProperty(CSSVar, String(value));
}

export function getCSSVar(CSSVar: string) {
    const root = getRoot();
    getComputedStyle(root).getPropertyValue(CSSVar);
}

export function toggleClass(element: Element, styleClass: string) {
    element.classList.toggle(styleClass);
}

export function removeChildren(element: Element) {
    while (element.lastElementChild) {
        element.removeChild(element.lastElementChild);
    }
}

/////////////////////////////////////////
//// Maths-related Utilities & Types ////
/////////////////////////////////////////

export type Bound = [number, number];
export type Vec2 = [number, number];

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

export type Coordinate2D = [number, number];
export type Coordinate3D = [number, number, number];

export function coordToId<T extends Coordinate2D | Coordinate3D>(
    coordinate: T
) {
    return "__" + coordinate.join("_");
}

export function idToCoord<T extends Coordinate2D | Coordinate3D>(id: string) {
    return id.replace("__", "").split("_").map(Number) as T;
}

export type Entity2D = {
    position: Coordinate2D;
};

export type Entity3D = {
    position: Coordinate3D;
};

/////////////////////////////////////////
//// Logic-related Utilities & Types ////
/////////////////////////////////////////

export type Predicate<T> = (...args: Array<T>) => boolean;
