// 获取图片信息，这里主要要获取图片缓存地址
export function loadImage(url) {
	return new Promise(resolve => {
		uni.getImageInfo({
			src: url,
			success: (res) => {
				resolve(res.path)
			},
			fail: () => {
				resolve("")
			}
		})
	})
}
// 解析海报对象，绘制canvas海报
export function createPoster(ctx, posterItemList) {
	return new Promise((resolve, reject) => {
		try {
			// 单行文本超出隐藏
			const textEllipsis = (text, maxWidth) => {
				let strWidth = ctx.measureText(text).width;
				const ellipsis = '…';
				const ellipsisWidth = ctx.measureText(ellipsis).width;
				if (strWidth > maxWidth && maxWidth > ellipsisWidth) {
					var len = text.length;
					while (strWidth >= (maxWidth - ellipsisWidth) && len-- > 0) {
						text = text.slice(0, len);
						strWidth = ctx.measureText(text).width;
					}
					text += ellipsis;
				}
				return text
			}
			// 文本换行
			const breakTextLines = (text, maxWidth) => {
				const words = text.split('');
				let line = '';
				const lines = [];
				for (let i = 0; i < words.length; i++) {
					const word = words[i];
					const testLine = line + word;
					const metrics = ctx.measureText(testLine);
					if (metrics.width > maxWidth && i > 0) {
						lines.push(line);
						line = word;
					} else {
						line = testLine;
					}
				}
				lines.push(line);
				return lines;
			};
			for (let i = 0; i < posterItemList.length; i++) {
				const temp = posterItemList[i];
				if (temp.type === 'image') {
					ctx.setStrokeStyle("rgba(255, 255, 255, 0)")
					ctx.save()
					var x = temp.config.x;
					var y = temp.config.y;
					var width = temp.config.w;
					var height = temp.config.h;
					var radius = temp.config.r || 0;
					ctx.beginPath();
					ctx.moveTo(x + radius, y);
					ctx.lineTo(x + width - radius, y);
					ctx.arc(x + width - radius, y + radius, radius, -Math.PI / 2, 0); // 从右边绘制圆角
					ctx.lineTo(x + width, y + height - radius);
					ctx.arc(x + width - radius, y + height - radius, radius, 0, Math.PI / 2); // 从底部绘制圆角
					ctx.lineTo(x + radius, y + height);
					ctx.arc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI); // 从左边绘制圆角
					ctx.lineTo(x, y + radius)
					ctx.arc(x + radius, y + radius, radius, -Math.PI, -Math.PI / 2);
					ctx.closePath();
					ctx.clip();
					ctx.drawImage(temp.url, temp.config.x, temp.config.y, temp.config.w, temp.config.h);
					ctx.restore()
				} else if (temp.type === 'imageGroup') {
					let itemX = parseFloat(temp.config.x)
					for (let j in temp.group) {
						if (j >= 3) break;
						ctx.drawImage(temp.group[j], itemX, temp.config.y, temp.config.w, temp.config.h);
						itemX += parseFloat(temp.config.w) + parseFloat(temp.config.space)
					}
				} else if (temp.type === 'avatar') {
					ctx.save();
					ctx.beginPath();
					ctx.arc(temp.config.w / 2 + temp.config.x, temp.config.h / 2 + temp.config.y, temp.config.w / 2, 0, Math.PI * 2);
					ctx.clip();
					ctx.drawImage(temp.url, temp.config.x, temp.config.y, temp.config.w, temp.config.h);
					ctx.restore();
					ctx.setStrokeStyle('#fff');
				} else if (temp.type === 'text') {
					if (temp.config.font) ctx.font = temp.config.font
					else ctx.font = "10px sans-serif"
					temp.config.fontSize && ctx.setFontSize(temp.config.fontSize);
					temp.config.color && ctx.setFillStyle(temp.config.color);
					temp.config.textAlign && ctx.setTextAlign(temp.config.textAlign);
					ctx.setTextBaseline("middle")
					if (temp.config.wrap) {
						const maxWidth = temp.config.maxWidth;
						const lineHeight = temp.config.lineHeight;
						const lines = breakTextLines(temp.text, maxWidth);
						const lineNumber = temp.config.lineNumber || 2;
						if (temp.config.isVerticalCenter) {
							temp.config.y += lineHeight * lineNumber / 2 - lines.length * lineHeight / 2
						}
						for (let index = 0; index < lineNumber; index++) {
							if (index >= lines.length) break;
							let line = lines[index]
							if (index == lineNumber - 1 && (index + 1) < lines.length) {
								line = textEllipsis(line + "...", maxWidth)
								ctx.fillText(line, temp.config.x, temp.config.y + index * lineHeight);
							} else {
								ctx.fillText(line, temp.config.x, temp.config.y + index * lineHeight);
							}
						}
					} else {
						const lineHeight = temp.config.lineHeight;
						if (temp.config.isVerticalCenter) {
							temp.config.y += lineHeight / 2
						}
						temp.text = textEllipsis(temp.text, temp.config.maxWidth)
						ctx.fillText(temp.text, temp.config.x, temp.config.y);
					}
					ctx.stroke();
				} else if (temp.type === 'textGroup') {
					let itemX = temp.config.x
					for (var j in temp.group) {
						const item = temp.group[j]
						if (temp.font) ctx.font = temp.font
						else ctx.font = "10px sans-serif"
						item.fontSize && ctx.setFontSize(item.fontSize);
						item.color && ctx.setFillStyle(item.color);
						temp.config.textAlign && ctx.setTextAlign(temp.config.textAlign);
						ctx.setTextBaseline("middle")
						if (item.wrap) {
							const maxWidth = temp.config.maxWidth - itemX + parseFloat(temp.config.x); // 最大宽度
							const lineHeight = item.lineHeight; // 行高
							const lines = breakTextLines(item.text, maxWidth);
							const lineNumber = item.lineNumber || 2;
							for (let index = 0; index < lineNumber; index++) {
								if (index >= lines.length) break;
								let line = lines[index]
								if (index == lineNumber - 1 && (index + 1) < lines.length) {
									line = textEllipsis(line + "...", maxWidth)
									ctx.fillText(line, itemX, temp.config.y + index * lineHeight);
								} else {
									ctx.fillText(line, itemX, temp.config.y + index * lineHeight);
								}
							}
						} else {
							ctx.fillText(item.text, itemX, temp.config.y);
						}
						ctx.stroke();
						itemX += parseFloat(ctx.measureText(item.text).width)
					}
				} else if (temp.type === 'line') {
					ctx.beginPath()
					ctx.setLineWidth(temp.config.w)
					ctx.moveTo(temp.config.xo, temp.config.y)
					ctx.lineTo(temp.config.xt, temp.config.y)
					ctx.setStrokeStyle(temp.config.color)
					ctx.stroke()
				} else if (temp.type === 'function') {
					temp.function()
				}
			}
			ctx.draw();
			resolve()
		} catch (e) {
			reject(e)
		}
	})
}
// canvas转image图片
export function canvasToTempFilePath(canvasId, vm, delay = 50) {
	return new Promise((resolve, reject) => {
		// 这里canvas绘制完成之后想要存缓存需要一定时间，这里设置了50毫秒
		setTimeout(() => {
			uni.canvasToTempFilePath({
				canvasId: canvasId,
				success(res) {
					if (res.errMsg && res.errMsg.indexOf('ok') != -1) resolve(res.tempFilePath);
					else reject(res)
				},
				fail(err) {
					reject(err)
				}
			}, vm);
		}, delay)
	})
}
// 保存图片到相册
export function saveImageToPhotosAlbum(imagePath) {
	return new Promise((resolve, reject) => {
		uni.saveImageToPhotosAlbum({
			filePath: imagePath,
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}