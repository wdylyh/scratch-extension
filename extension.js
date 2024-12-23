// extension.js
function arabicToChinese(num) {
    const chineseNumbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    const units = ['', '十', '百', '千'];
    const bigUnits = ['万', '亿', '兆'];
    let strNum = num.toString();
    let result = '';
    let unitIndex = 0;
    let bigUnitIndex = 0;

    // 处理负数
    if (strNum[0] === '-') {
        result = '负';
        strNum = strNum.substring(1);
    }

    // 从个位开始处理每一位数字
    while (strNum.length > 0) {
        let part = strNum.substring(strNum.length - 4, strNum.length);
        strNum = strNum.substring(0, strNum.length - 4);

        // 如果当前部分是0，跳过处理
        if (part === '0000') {
            continue;
        }

        let partResult = '';
        for (let i = 0; i < part.length; i++) {
            let digit = parseInt(part[i]);
            if (digit !== 0) {
                partResult = chineseNumbers[digit] + units[part.length - 1 - i] + partResult;
            } else if (partResult !== '' && partResult[0] !== '零') {
                partResult = '零' + partResult;
            }
        }

        // 处理“十”的特殊情况
        partResult = partResult.replace(/零十/g, '十');
        partResult = partResult.replace(/零+/g, '零');

        // 添加大单位
        if (unitIndex === 4) {
            partResult += bigUnits[bigUnitIndex];
            bigUnitIndex++;
            unitIndex = 0;
        } else {
            unitIndex++;
        }

        result = partResult + result;
    }

    // 处理最后的“零”
    result = result.replace(/零+/g, '零');
    result = result.replace(/零(万|亿|兆)/g, '$1');
    result = result.replace(/(万|亿|兆)零/g, '$1');

    return result;
}

// Scratch extension initialization code
const myExtension = {
    // Register the block
    blocks: [
        {
            opcode: 'arabicToChinese',
            blockType: Scratch.BlockType.REPORTER,
            text: '将阿拉伯数字转换成中文数字 [NUM]',
            arguments: {
                NUM: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: 0
                }
            }
        }
    ],
    // Define the function to be called when the block is run
    menus: {
        NUM: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    },
    // Method to run the block's function
    blockToCode: function(block) {
        const num = block.fields.NUM.value;
        return arabicToChinese(num);
    }
};

// Register the extension with Scratch
Scratch.extensions.register(myExtension);