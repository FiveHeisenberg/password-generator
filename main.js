let passwordLenght = document.getElementById('passwordLenght');
        let password = document.getElementById('password');
        let add = document.getElementById('more');
        let simbol = document.getElementById('symbol');
        let saveButton = document.getElementById('saveButton');
        saveButtonCheck();

        function generatePassword(len) {
            const upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz';
            const numeric = "1234567890";
            const additional = "._";
            const symbol = "!@#$%^&*()-={}[]';:/?><~";
            let data = upperAlphabet + lowerAlphabet + numeric;

            if (add.checked) {
                data += additional;
            }
            if (simbol.checked) {
                data += symbol;
            }

            let generator = '';
            for (let index = 0; index < len; index++) {
                generator += data[~~(Math.random() * data.length)];
            } 
            return generator;
        }

        function saveButtonCheck() {
            if (passwordLenght.value != '') {               
                saveButton.classList.remove("cursor-not-allowed");
                saveButton.classList = "text-white bg-blue-800 hover:bg-button focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            } else {
                saveButton.classList = "py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600"
                saveButton.classList.add("cursor-not-allowed")
            }
            
        }

        function getPassword() {
            const newPassword = generatePassword(passwordLenght.value);
            password.value = newPassword;
            saveButton.disabled = false;
            saveButtonCheck()
        }

        function savePassword() {
            let fileName = prompt('Untuk Apa Password Tersebut? (Misalkan : "Instagram")');

            if (fileName) {
                const fileContent = `Password for ${fileName}: ${password.value}`;
                const blob = new Blob([fileContent], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);

                const downloadLink = document.createElement('a');
                downloadLink.href = url;
                downloadLink.download = `Password ${fileName}.txt`;
                downloadLink.click();

                URL.revokeObjectURL(url);
            }
        }

        passwordLenght.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                getPassword();
            }
        });