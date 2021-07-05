export class ProductImageRequest {
	id: string;
	perspective?: string | null;
	imageType?: string | null;


	/**
	 * @param  {string} id Product ID to get 
	 * @param  {string|null} perspective? Perspective of the image @see Perspective
	 * @param  {string|null} imageType? Image type @see ProductImageType 
	 */
	constructor(id: string, perspective?: string | null, imageType?: string | null) {
		this.id = id;
		this.perspective = perspective;
		this.imageType = imageType;
	}
}

// Side you're looking at
export const Perspective = {
	Front: "Front",
	Back: "Back",
	Left: "Left",
	Right: "Right"
}

export const ProductImageType = {
	Hero: "Hero",
	Carousel: "Carousel"
};
