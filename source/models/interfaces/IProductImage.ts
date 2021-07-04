export interface IProductImageRequest {
	id: string;
	perspective: Perspective;
	imageType: ProductImageType;
}

// Side you're looking at
export enum Perspective {
	Front,
	Back,
	Left,
	Right
}

export enum ProductImageType {
	Hero,
	Carousel
}
