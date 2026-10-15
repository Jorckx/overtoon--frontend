export function getImages(imgQuery: string) {
	return {
		query: imgQuery,
		select: {
			id: true,
			uuid: true,
			type: true,
			template: true,
			category: true,
			projecttype: true,
			year: true,
			url: true,
			name: true,
			avif: 'file.type == "image" ? file.srcset("avif") : null',
			webp: 'file.type == "image" ? file.srcset("webp") : null',
			lowress: 'file.type == "image" ? file.srcset("lowress") : null',
			width: 'file.type == "image" ? file.s3_json.value : null',
			height: 'file.type == "image" ? file.s3_json.value : null',
			s3_json: true,
			fullwidth: 'file.fullwidth.toBool',
			border: 'file.border.toBool',
			dimensions: true,
			src: true,
			srcset: true,
			ratio: true,
			alt: true,
			caption: true,
			extension: true,
			coverpadding: true,
			coverbg: true
		}
	};
}
