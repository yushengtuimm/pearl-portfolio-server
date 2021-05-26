declare class Options {
    quality: number;
    density: number;
    width: number;
    height: number;
    background: string;
    constructor();
    setDensity(density: number): void;
    setQuality(quality: number): void;
    setWidth(width: number): void;
    setHeight(height: number): void;
    setBackground(background: string): void;
    get options(): ({
        key: string;
        value: number;
    } | {
        key: string;
        value: string;
    })[];
    get convertString(): string;
    static create({ density, quality, width, height, background, }: {
        density?: number;
        quality?: number;
        width?: number;
        height?: number;
        background?: string;
    }): Options;
}
export default Options;
