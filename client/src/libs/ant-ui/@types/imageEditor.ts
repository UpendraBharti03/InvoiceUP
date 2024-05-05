type annotationsCommon = {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
    shadowBlur?: number;
    shadowColor?: string;
    shadowOpacity?: number;
    opacity?: number;
};

type lineCap = 'butt' | 'round' | 'square';

type textAnnotation = annotationsCommon & {
    text?: string;
    fontFamily?: string;
    fontSize?: number;
    letterSpacing?: number;
    lineHeight?: number;
    align?: 'left' | 'center' | 'right';
    fontStyle?: 'normal' | 'bold' | 'italic' | 'bold italic';
};

type rectAnnotation = annotationsCommon & {
    cornerRadius?: number;
};

type polygonAnnotation = annotationsCommon & {
    sides?: number;
};

type penAnnotation = annotationsCommon & {
    tension?: number;
    lineCap?: lineCap;
};

type lineAnnotation = annotationsCommon & {
    lineCap?: lineCap;
};

type arrowAnnotation = annotationsCommon & {
    lineCap?: lineCap;
    pointerLength?: number;
    pointerWidth?: number;
};

export type savedImageData = {
    name: string;
    extension: string;
    mimeType: string;
    fullName?: string;
    height?: number;
    width?: number;
    imageBase64?: string;
    imageCanvas?: HTMLCanvasElement; // doesn't support quality
    quality?: number;
    cloudimageUrl?: string;
};

export type imageDesignState = {
    imgSrc?: string;
    finetunes?: string[];
    finetunesProps?: {
        brightness?: number;
        contrast?: number;
        hue?: number;
        saturation?: number;
        value?: number;
        blurRadius?: number;
        warmth?: number;
    };
    filter?: string;
    adjustments?: {
        crop: {
            ratio: string | number;
            width?: number;
            height?: number;
            x?: number;
            y?: number;
            ratioFolderKey?: string;
            ratioGroupKey?: string;
            ratioTitleKey?: string;
        };
        isFlippedX?: boolean;
        isFlippedY?: boolean;
        rotation?: number;
    };
    annotations?: {
        [key: string]: annotationsCommon &
            (textAnnotation | rectAnnotation | polygonAnnotation | penAnnotation | lineAnnotation | arrowAnnotation) & {
                id: string;
                name: string;
                x: number;
                y: number;
                scaleX?: number;
                scaleY?: number;
                width?: number; //Text/Image/Rect
                height?: number; //Text/Image/Rect
                radius?: number; // Polygon
                radiusX?: number; // Ellipse
                radiusY?: number; // Ellipse
                points?: number[]; // Pen/Line/Arrow
                image?: string | HTMLElement; // Image
            };
    };
    resize?: {
        width?: number;
        height?: number;
        manualChangeDisabled?: boolean;
    };
    shownImageDimensions?: {
        width: number;
        height: number;
        scaledBy: number;
    };
};

export type onSaveFunction = (savedImageData: savedImageData, imageDesignState: imageDesignState) => void | Promise<void>;
