export type imageType = {
  id: string,
	uuid: string,
	category?: string,
	url: string,
	name?: string,
	avif?: string | null,
	webp?: string | null,
	lowress?: string | null,
	width?: string,
	height?: string,
	srcset?: string,
	ratio?: string,
	alt?: string,
	caption?: string,
	extension?: string
};

export function getImages(imgQuery: string) {
	return {
		query: imgQuery,
		select: {
			id: true,
			uuid: true,
			category: true,
			url: true,
			name: true,
			avif: 'file.type == "image" ? file.srcset("avif") : null',
			webp: 'file.type == "image" ? file.srcset("webp") : null',
			lowress: 'file.type == "image" ? file.srcset("lowress") : null',
			width: 'file.type == "image" ? file.s3_width : null',
			height: 'file.type == "image" ? file.s3_height : null',
			srcset: true,
			ratio: true,
			alt: true,
			caption: true,
			extension: true
		}
	};
}
