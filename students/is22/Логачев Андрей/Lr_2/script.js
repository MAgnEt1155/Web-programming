// файл script.js
window.onload = function(){ 

    let a = ''
    let b = ''
    let c = ''
    let o = 100000000000
    let π = 3.1415926535
    let e = 2.7182818284
    let express = ''
    let result = ''
    let currentIndex = 0;
    const images = [
        '1w.jpg', 
        '2w.png',
        '3w.jpg'
    ];
    btnErace = document.getElementById("btn_op_clear")
    
    // окно вывода результата
    expressElement = document.getElementById("express")
    resultElement = document.getElementById("result")
    
    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    //запись нажатой цифры в переменные
    function onDigitButtonClicked(digit) {
        btnErace.textContent = '⌫'
        if (a != '' || digit != 0) 
        if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
            a += digit
            result += digit 
            express += digit
            expressElement.innerHTML = express
        }
    }
    
    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });
    
    //==================================================================установка колбек-функций для кнопок операций
    //кнопка умножения
    document.getElementById("btn_op_mult").onclick = function() { 
        if(a != '') {
            result += '*'
            express += 'x'
            expressElement.innerHTML = express
            a = ''
            btnErace.textContent = '⌫'
        }
    }
    //кнопка сложения
    document.getElementById("btn_op_plus").onclick = function() { 
        if(a != '+' && a != '') {
            result += '+'
            express += '+'
            expressElement.innerHTML = express
            a = '+'
            btnErace.textContent = '⌫'
        }
    }
    //кнопка вычитания
    document.getElementById("btn_op_minus").onclick = function() { 
        if(a != '-' && a != '') {
            result += '-'
            express += '-'
            expressElement.innerHTML = express
            a = '-'
            btnErace.textContent = '⌫'
        }
    }
    //кнопка деления
    document.getElementById("btn_op_div").onclick = function() { 
        if(a != '') {
            result += '/'
            express += '÷'
            expressElement.innerHTML = express
            a = ''
            btnErace.textContent = '⌫'   
        }      
    }
    //кнопка вычисления процентов
    document.getElementById("btn_op_percent").onclick = function() {
        if(a != '%' && a != '') {
            result += '%'
            express += '%'
            expressElement.innerHTML = express
            a = ''
            btnErace.textContent = '⌫'
        }
    }
    //кнопка вычисления корня
    document.getElementById("btn_op_sqrt").onclick = function() {
        if(a != '') {
            if(a > 0) {
                express = express.slice(0, -a.length)
                result = result.slice(0, -a.length)
                express += '√' + a
                resultElement.innerHTML = express
                a = Math.round((Math.sqrt(a) + Number.EPSILON) * o) / o
                expressElement.innerHTML = a
                result += a
                btnErace.textContent = 'AC'
                a = ''
            }
            else {
                expressElement.innerHTML = "Error"
                resultElement.innerHTML = express
                express = ''
                result = ''
                a = '' 
            }
        }
    }
    //кнопка расчета факториала
    document.getElementById("btn_op_fac").onclick = function() {
        btnErace.textContent = 'AC'
        if (a < 0) return resultElement.innerHTML = "Недопустимое число"
        if (a > 170) return resultElement.innerHTML = "Infinity" 
        if (a === '') return 
            express = express.slice(0, -a.length) + a + '!'
            expressElement.innerHTML = express
            result = result.slice(0, -a.length)
            c = 1
            for (let i = 2; i <= a; i++)
                c *= i
            a = c
            result += a
            a = ''
            btnErace.textContent = '⌫'
    }
    //кнопка смены знака
    document.getElementById("btn_op_sign").onclick = function() {
        if (a === '') return
        express = express.slice(0, -a.length)
        result = result.slice(0, -a.length)
        a = -a
        if (a > 0)
            express += '+'
            result += '+'
        express += a
        result += a
        expressElement.innerHTML = express
    }
    //кнопка возведения в степень
    document.getElementById("btn_op_deg").onclick = function() {
        if (a === '') return
            express +=  '²'
            result += '*' + a
            expressElement.innerHTML = express
            btnErace.textContent = '⌫'
    }
    //кнопка добавления трех нулей
    document.getElementById("btn_op_null").onclick = function() {
        if (a === '') return
            express += '000'
            result += '000'
            expressElement.innerHTML = express
            btnErace.textContent = '⌫'
    }
    //кнопка смены обоев
    document.getElementById("change-wall").onclick = function() {
        currentIndex = (currentIndex + 1) % images.length
        document.body.style.backgroundImage = `url(${images[currentIndex]})`
    }
    // кнопка очищения стирания
    document.getElementById("btn_op_clear").onclick = function() { 
        
        switch(btnErace.textContent) {
            case '⌫':
                express = express.slice(0, -1)
                result = result.slice(0, -1)
                a = a.slice(0, -1)
                expressElement.innerHTML = express
                if ( express == '') {
                    btnErace.textContent = 'AC'
                    expressElement.innerHTML = 0
                }
                break;
            case 'AC':
                expressElement.innerHTML = 0
                resultElement.innerHTML = express
                express = ''
                result = ''
                a = ''
                break;
        }
    }
    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() { 
        btnErace.textContent = 'AC'
        result = result.replace(/(\d+)%/g, '($1/100)');
        result = result.replace(/(\d+)(%)/g, (_, number) => `(${number} / 100)`); // Преобразование процентов
result = result.replace(/(\d+)\s*-\s*\((\d+)\s*\/\s*100\)/g, (_, base, percent) => `(${base} - (${base} * ${percent} / 100))`); // Поддержка выражений типа X - Y%
        a = eval(result)
        resultElement.innerHTML = express
        result = a
        express = a
        expressElement.innerHTML = a
    }
};