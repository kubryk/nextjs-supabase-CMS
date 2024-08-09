// class ShortcodeParser {
//     //TODO: баг якщо в тексті кепшону буде самозакривний тег
//     captionParser(content: string) {
//         const captionOpen = /\[caption]/;
//         const captionClose = /\[\/caption]/;
//         const captionedTag: RegExp = /\[caption\].{1,}\[\/caption\]/g;
//         //Шукаємо всі img з шорткодом caption
//         const shortcodedImages = content.matchAll(captionedTag);
//         //Перетворюємо в массив
//         const shortcodesArr = Array.from(shortcodedImages);

//         const imgRegExp: RegExp = /\<img.{1,}\/>/g;
//         const captionRegExp: RegExp = /\/>.{1,}\[\/caption]/;

//         const shortcodesData = shortcodesArr.map((shortcodedTag) => {
//             //Чистий тег img
//             const cleanImg = shortcodedTag[0].match(imgRegExp)![0];
//             //Індекс за якийм шорткод розміщений в повному тексті статті
//             const startIndex = shortcodedTag['index'];
//             //Довжина шорткоду
//             const shortcodeLength = shortcodedTag[0].split('').length;
//             //Чистимо текст caption від неботребу
//             const cleanCaption = shortcodedTag[0].match(captionRegExp)![0].replace(captionClose, '').replace('/>', '');


//             const taggedImg = `<div class="image_wrapper">` + cleanImg;
//             const taggedCaption = `<div class="image_caption">` + cleanCaption + `</div></div>`

//             return {
//                 cleanImg,
//                 cleanCaption,
//                 taggingResult: taggedImg + taggedCaption,
//                 startIndex,
//                 shortcodeLength
//             }
//         });
//     }












//     //     shortcodesData.forEach((value, index) => {
//     //     post.data.content = post.data.content.replace(/\[caption\].{1,}\[\/caption\]/, value.taggingResult)
//     // })
// }