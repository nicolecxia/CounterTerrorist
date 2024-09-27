/**
 * @author Changqing Xia
 * @category INFO-6122
 *           Project - Counter Strike:Team Builder
 *           Apr 12,2024
 */

const divBorder = getElementById("borderdiv");
const divPink = getElementById("pinkdiv");
const divHeader = getElementById("header");
const divMain = getElementById("maindiv");
const footer = getElementById("footer");

//add background music
var myAudio = document.createElement("audio");
myAudio.id = "myAudio";
myAudio.src = "./assets/music/GlobalOffensiveTheme2.mp3";
myAudio.preload = "auto";
myAudio.autoplay = "true";
myAudio.loop = "true";
divBorder.insertBefore(myAudio, divPink);

var imgAudio = document.createElement("img");
imgAudio.id = "imgAudio";
imgAudio.src = "./assets/imgs/music-play-button.svg";
imgAudio.style.float = "left";
imgAudio.style.width = "30px";
imgAudio.style.backgroundColor = "aliceblue";
divBorder.insertBefore(imgAudio, divPink);

imgAudio.addEventListener("click", togglePlay);

function togglePlay() {
    return myAudio.paused ? myAudio.play() : myAudio.pause();
};

// add icon image and title in <header>  
var imgIcon = document.createElement("img");
imgIcon.id = "logo";
imgIcon.src = "./assets/imgs/icon.png";
imgIcon.style.display = "inline-block";
imgIcon.style.width = "8%";
divHeader.appendChild(imgIcon);

const titleLabel = document.createElement("h1");
titleLabel.id = "titlelabel";
titleLabel.style.display = "inline-block";
divHeader.appendChild(titleLabel);

const titleRight = document.createElement("h1");
titleRight.id = "titleright";
titleRight.style.display = "inline-block";
titleRight.style.paddingLeft = "8%";
divHeader.appendChild(titleRight);

let character = {};//user's character
let weaponArray = [];//user's character weapon list
let teamMembers = [];//random team members

let category = []; //weapon Category
let weaponCategory = []; //weapon sub-Category
let weaponName = [];//weapon

let resultAgentArray;//all agent list
let resultAgentArrayFilter; //all agent belongs to the terrorist user choosen
let resultWeaponArray; //all weapon list
let resultWeaponArrayFilter;//all weapon belongs to the terrorist user choosen


class chosenWeaponDetail {
    constructor(category, weaponCategory, weaponName, price, weaponImg, weaponId) {
        this.category = category;
        this.weaponCategory = weaponCategory;
        this.weaponName = weaponName;
        this.price = price;
        this.weaponImg = weaponImg;
        this.weaponId = weaponId;
    }
}

function getElementById(id) {
    const elementEntity = document.getElementById(id);
    return elementEntity;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function screen1() {
    titleLabel.innerText = 'Counter Strike:Team Builder';
    divMain.style.height = "760px";
    divMain.innerHTML = `<button id="btnstart" class="bigbutton">Start</button>`;

    const btnStart = getElementById("btnstart");
    btnStart.addEventListener("click", screen2);
}

// select terrorist
function screen2() {
    titleLabel.innerText = 'Choose a terrorist';
    divMain.innerHTML = "";

    const btnTerrorist = document.createElement("button");
    btnTerrorist.id = "terrorist";
    btnTerrorist.textContent = "Terrorist";
    btnTerrorist.classList.add("bigbutton");
    divMain.appendChild(btnTerrorist);

    const btnCounterTerrorist = document.createElement("button");
    btnCounterTerrorist.id = "counterterrorist";
    btnCounterTerrorist.textContent = "Counter Terrorist";
    btnCounterTerrorist.classList.add("bigbutton");
    divMain.appendChild(btnCounterTerrorist);

    const btnAutoSelect = document.createElement("button");
    btnAutoSelect.id = "autoselect";
    btnAutoSelect.textContent = "Auto Select";
    btnAutoSelect.classList.add("bigbutton");
    divMain.appendChild(btnAutoSelect);

    btnTerrorist.addEventListener("click", terrorist);

    btnCounterTerrorist.addEventListener("click", counterTerrorist);

    btnAutoSelect.addEventListener("click", autoSelect);
}

// show agent list and allow user select
function screen3() {
    // Define the API URL
    const apiUrl = 'https://bymykel.github.io/CSGO-API/api/en/agents.json';
    let innerHTML = '';
    character.agentId = null;
    footer.style.height = "180px";
    divMain.style.height = "580px";

    let terroristNow = character.terrorist.replace("-", " ");
    titleLabel.innerText = `Choose an agent - ${terroristNow}`;
    divMain.innerHTML = ``;

    var ftLabel = document.createElement("h2");
    ftLabel.classList.add("ftLabel");
    ftLabel.textContent = "Name your agent:";
    footer.appendChild(ftLabel);

    // agent name input text
    var ftText = document.createElement("input");
    ftText.id = "ftText";
    ftText.type = "text";
    footer.appendChild(ftText);

    var ftBtn3 = document.createElement("button");
    ftBtn3.id = "btnsharpyscreen3";
    ftBtn3.classList.add("ftBtn");
    ftBtn3.textContent = "Select";
    footer.appendChild(ftBtn3);

    var ftErrorMsg = document.createElement("p");
    ftErrorMsg.id = "errMsg";
    ftErrorMsg.classList.add("ftErrorMsg");
    footer.appendChild(ftErrorMsg);

    var divMsg = document.createElement("div");
    divMsg.classList.add("divAgentDes");
    divMsg.id = "showMsg";
    footer.appendChild(divMsg);

    var ftDesMsg = document.createElement("p");
    ftDesMsg.id = "descriptionMsg";
    ftDesMsg.classList.add("ftDesMsg");
    divMsg.appendChild(ftDesMsg);

    let divAgentContanior = document.createElement("div");
    divAgentContanior.id = "flexcontainer";
    divAgentContanior.classList.add("divAgentContanior");
    divMain.appendChild(divAgentContanior);

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {

            resultAgentArray = Object.values(data);
            console.log("All Agents:");
            console.log(resultAgentArray);

            //find agent belongs to the terrorist user choosen
            resultAgentArrayFilter = resultAgentArray.filter((element) => element.team.name == character.terrorist);
            console.log("Agents of this terrorist:");
            console.log(resultAgentArrayFilter);

            resultAgentArrayFilter.forEach((element) => {
                let divAgent = document.createElement("div");
                divAgent.id = element.id;
                divAgent.any = element.description;

                let imgAgent = document.createElement("img");
                imgAgent.src = element.image;
                imgAgent.classList.add("agentImg");
                divAgent.appendChild(imgAgent);

                let pAgent = document.createElement("p");
                pAgent.textContent = element.name;
                divAgent.appendChild(pAgent);

                divAgentContanior.appendChild(divAgent);

                divAgent.addEventListener("mouseover", () => {
                    ftDesMsg.innerHTML = divAgent.any;
                })
                divAgent.addEventListener("mouseout", () => {
                    ftDesMsg.innerHTML = "";
                })

                divAgent.addEventListener("click", () => {
                    if (character.agentId != null) {
                        getElementById(character.agentId).style.backgroundColor = "#eef4ee";
                    }
                    getElementById(element.id).style.backgroundColor = "#ace8ca";
                    character.agentId = element.id;
                    character.agentDefaultName = element.name;
                    character.agentImgURL = element.image;
                    ftText.value = element.name;

                })
            });
            ftBtn3.addEventListener('click', agentNameCheck);
        })
        .catch(err => {
            console.error('Error:', err);
        });
}

// show weapon list and allow user select
function screen4() {
    // Define the API URL
    const apiUrl = 'https://bymykel.github.io/CSGO-API/api/en/skins.json';
    let innerHTML = '';

    footer.innerHTML = "";
    footer.style.height = "";
    divMain.style.height = "490px";

    var divchooseWeaponList = document.createElement("div");
    divchooseWeaponList.id = "chooseWeaponList";
    divchooseWeaponList.classList.add("chooseWeaponList");
    footer.appendChild(divchooseWeaponList);

    var ftTitleLabel = document.createElement("h3");
    ftTitleLabel.textContent = "Chosen Weapon:";
    divchooseWeaponList.appendChild(ftTitleLabel);


    var divBtn = document.createElement("div");
    divBtn.classList.add("divBtn");
    divBtn.id = "showBtn";
    footer.appendChild(divBtn);

    var ftBtn4 = document.createElement("button");
    ftBtn4.id = "btnsharpyscreen4";
    ftBtn4.classList.add("ftBtn");
    ftBtn4.textContent = "Select";
    divBtn.appendChild(ftBtn4);

    var divMsg = document.createElement("div");
    divMsg.classList.add("divMsg");
    divMsg.id = "showMsg";
    footer.appendChild(divMsg);

    var ftDesMsg = document.createElement("p");
    ftDesMsg.id = "descriptionMsg";
    ftDesMsg.classList.add("ftDesMsg");
    divMsg.appendChild(ftDesMsg);

    var ftErrorMsg = document.createElement("p");
    ftErrorMsg.id = "errMsg";
    ftErrorMsg.classList.add("ftErrorMsg");
    divMsg.appendChild(ftErrorMsg);

    character.Balance = 9000;
    let terroristNow = character.terrorist.replace("-", " ");
    titleLabel.innerText = `Choose Weapons and Gears - ${terroristNow}`;
    titleRight.innerHTML = `Balance: $${character.Balance}`;

    // Make a GET request
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {

            resultWeaponArray = Object.values(data);
            console.log("All weapons:");
            console.log(resultWeaponArray);

            //find weapon category belongs to the terrorist user choosen
            resultWeaponArrayFilter = resultWeaponArray.filter((element) => (element.team.name == 'Both Teams') || (element.team.name == character.terrorist));
            console.log("Weapons of this terrorist or are available for both teams:");
            console.log(resultWeaponArrayFilter);
            resultWeaponArrayFilter.forEach((element) => {
                if (element.category.name != null) {
                    if ((category.length < 1) || (!category.includes(element.category.name))) {
                        category.push(element.category.name);//find out all category
                    }
                }
            });

            divMain.innerHTML = ``;
            let divcategory = document.createElement("div");
            divcategory.id = "divcategory";
            divcategory.classList.add("listbutton");
            divMain.appendChild(divcategory);

            category.forEach((element) => {
                let leftbutton = document.createElement("button");
                leftbutton.classList.add("leftbutton");
                leftbutton.id = element;
                leftbutton.textContent = element;
                divcategory.appendChild(leftbutton);

                //add footer choosen weapon list 
                var pWeaponName = document.createElement("p");
                divchooseWeaponList.appendChild(pWeaponName);

                var weaponNameLabel = document.createElement("label");
                weaponNameLabel.classList.add("weaponNameLabel");
                weaponNameLabel.textContent = element + ":";
                pWeaponName.appendChild(weaponNameLabel);

                var weaponValueLabel = document.createElement("label");
                weaponValueLabel.classList.add("weaponValueLabel");
                weaponValueLabel.id = "chosen" + element;
                weaponValueLabel.textContent = "";
                pWeaponName.appendChild(weaponValueLabel);

                getElementById(element).addEventListener('click', () => {
                    if (character.weaponCategory != null) {
                        getElementById(character.weaponCategory).style.backgroundColor = "#eef4ee";
                        document.getElementById("divweapon").remove();
                        weaponName = [];
                        character.weaponCategory = null;
                        character.weaponPrice = null;
                    }
                    if (character.category != null) {
                        getElementById(character.category).style.backgroundColor = "#eef4ee";
                        document.getElementById("divweaponcategory").remove();
                        weaponCategory = [];
                        character.category = null;
                    }
                    getElementById(element).style.backgroundColor = "#ace8ca";
                    character.category = element;

                    //find out the weapon sub-category by category
                    let resultCategory = resultWeaponArrayFilter.filter((element) => element.category.name == character.category);

                    resultCategory.forEach((weaponDetail) => {
                        if (weaponDetail.name != null) {
                            if (!weaponDetail.name.includes('|')) return;
                            let weaponCategoryName = getWeaponCategoryName(weaponDetail.name);
                            if ((weaponCategory.length < 1) || (!weaponCategory.includes(weaponCategoryName))) {
                                weaponCategory.push(weaponCategoryName);//find out all weapon category
                            }
                        }
                    });

                    //list the weapon sub-category 
                    let divWeaponCategory = document.createElement("div");
                    divWeaponCategory.id = "divweaponcategory";
                    divWeaponCategory.classList.add("listbutton");
                    divMain.appendChild(divWeaponCategory);

                    weaponCategory.forEach((weaponelement) => {
                        let weaponCaregoryButton = document.createElement("button");
                        weaponCaregoryButton.id = weaponelement;
                        weaponCaregoryButton.classList.add("leftbutton");
                        weaponCaregoryButton.textContent = weaponelement;
                        divWeaponCategory.appendChild(weaponCaregoryButton);

                        weaponCaregoryButton.addEventListener('click', () => {
                            if (character.weaponCategory != null) {
                                getElementById(character.weaponCategory).style.backgroundColor = "#eef4ee";
                                document.getElementById("divweapon").remove();
                                weaponName = [];
                                character.weaponCategory = null;
                                character.weaponPrice = null;
                            }
                            getElementById(weaponelement).style.backgroundColor = "#ace8ca";
                            character.weaponCategory = weaponelement;

                            //find out the weapon by sub-category
                            let resultWeaponCategory = resultWeaponArrayFilter.filter((element) => {
                                if (element.name.includes(weaponelement + " |") || (element.name.includes(weaponelement) && !element.name.includes("|")))
                                    return element;
                            });

                            let divWeaponContainer = document.createElement("div");
                            divWeaponContainer.id = "divweapon";
                            divWeaponContainer.classList.add("divWeaponFlexContainer");
                            divMain.appendChild(divWeaponContainer);

                            resultWeaponCategory.forEach((weaponDetail) => {
                                if (weaponDetail.name != null) {
                                    let weaponNameTemp = getWeaponName(weaponDetail.name);
                                    if ((weaponName.length < 1) || (!weaponName.includes(weaponNameTemp))) {
                                        weaponName.push(weaponNameTemp);//find out all weapon in this sub-caegory

                                        let weaponNameNoneSpace = changeWeaponNameFormat(weaponNameTemp);
                                        let pricePeriod = getPricePeriod(character.category, "real");
                                        let weaponPrice = getRandomPrice(pricePeriod.min, pricePeriod.max);

                                        let divWeapon = document.createElement("div");
                                        divWeapon.name = weaponNameNoneSpace;
                                        divWeapon.any = weaponDetail.description;
                                        divWeapon.id = weaponDetail.id;



                                        let imgWeapon = document.createElement("img");
                                        imgWeapon.id = weaponNameNoneSpace + "ImgURL";
                                        imgWeapon.src = weaponDetail.image;

                                        let btnWeaponName = document.createElement("button");
                                        btnWeaponName.id = weaponNameNoneSpace;
                                        btnWeaponName.textContent = weaponNameTemp;

                                        let pPrice = document.createElement("p");
                                        let labPriceName = document.createElement("label");
                                        labPriceName.textContent = `Price: `;
                                        pPrice.appendChild(labPriceName);

                                        let labPrice = document.createElement("label");
                                        labPrice.id = weaponNameNoneSpace + "id";
                                        labPrice.textContent = weaponPrice;
                                        pPrice.appendChild(labPrice);

                                        divWeapon.appendChild(imgWeapon);
                                        divWeapon.appendChild(btnWeaponName);
                                        divWeapon.appendChild(pPrice);
                                        divWeaponContainer.appendChild(divWeapon);

                                        divWeapon.addEventListener("mouseover", () => {
                                            ftDesMsg.innerHTML = divWeapon.any;
                                        })

                                        divWeapon.addEventListener("mouseout", () => {
                                            ftDesMsg.innerHTML = "";
                                        })

                                        btnWeaponName.addEventListener("click", () => {
                                            ftErrorMsg.textContent = "";
                                            let priceValue = document.getElementById(`${btnWeaponName.id}id`).textContent;//the matched price
                                            let weaponImgURL = document.getElementById(`${btnWeaponName.id}ImgURL`).src;//weapon image URL
                                            let weaponId = btnWeaponName.parentElement.id;
                                            // const weaponItem = { category: character.category, weaponCategory: character.weaponCategory, weaponName: btnWeaponName.textContent, price: priceValue, weaponImg: weaponImgURL, weaponId: weaponId };
                                            const weaponItem = new chosenWeaponDetail(character.category, character.weaponCategory, btnWeaponName.textContent, priceValue, weaponImgURL, weaponId);
                                            const foundItem = weaponArray.find((item) => item.category == character.category);
                                            if (foundItem != undefined) {
                                                const itemIndex = weaponArray.indexOf(foundItem);
                                                if (itemIndex > -1) { // only splice array when item is found
                                                    weaponArray.splice(itemIndex, 1); // remove the previous weaponname of the same category
                                                }
                                            }

                                            weaponArray.push(weaponItem);
                                            //update the choosen weapon list ,weapon name and price
                                            weaponArray.forEach((item) => {
                                                let labWeaponItem = document.getElementById(`chosen${item.category}`);
                                                labWeaponItem.textContent = `${item.weaponName} (Price:$${item.price})`;
                                            });

                                            // check balance
                                            if (!checkBanlance()) { return; }

                                        });
                                    }
                                }
                            });
                        });
                    })
                });
            });
        })
        .catch(err => {
            console.error('Error:', err);
        });

    // add sharp button function
    ftBtn4.addEventListener("click", () => {
        if (!checkBanlance()) { return; }
        if (!checkSelectWeapon(category)) { return; }
        // remove the tempData
        delete character.weaponCategory;
        delete character.weaponPrice;
        delete character.category;
        screen5();
    })
}

// show chosen character and weapons
function screen5() {
    footer.innerHTML = "";
    divMain.innerHTML = "";
    divMain.style.height = "760px";

    let terroristNow = character.terrorist.replace("-", " ");
    titleLabel.innerText = `${terroristNow} - ${character.agentName}`;
    titleRight.innerHTML = `Balance: $${character.Balance}`;

    let divCharacter = document.createElement("div");
    divCharacter.id = "divcharacter";
    divCharacter.classList.add("listCharacter");
    divMain.appendChild(divCharacter);

    //list the weapon detail of charactor
    let divWeaponContainer = document.createElement("div");
    divWeaponContainer.classList.add("divWeaponContainer");
    divCharacter.appendChild(divWeaponContainer);

    let divCharacterWeapon = document.createElement("div");
    divCharacterWeapon.classList.add("divCharacterFlexContainer");
    divCharacterWeapon.id = "divcharacterweapon";
    divWeaponContainer.appendChild(divCharacterWeapon);

    weaponArray.forEach((weaponItem) => {
        let divWeaponItem = document.createElement("div");
        divWeaponItem.id = weaponItem.weaponId;
        divCharacterWeapon.appendChild(divWeaponItem);

        let imgWeapon = document.createElement("img");
        imgWeapon.src = weaponItem.weaponImg;
        divWeaponItem.appendChild(imgWeapon);

        let pWeaponDetail = document.createElement("p");
        // pWeaponDetail.style.visibility = "hidden";
        pWeaponDetail.style.opacity = "0.5";
        divWeaponItem.appendChild(pWeaponDetail);

        let labWeaponName = document.createElement("label");
        labWeaponName.textContent = `Name: ${weaponItem.weaponName}`;
        pWeaponDetail.appendChild(labWeaponName);

        let labWeaponPrice = document.createElement("label");
        labWeaponPrice.textContent = `Price: $${weaponItem.price}`;
        pWeaponDetail.appendChild(labWeaponPrice);

        let labCategory = document.createElement("label");
        labCategory.textContent = `Category: ${weaponItem.category}`;
        pWeaponDetail.appendChild(labCategory);

        let labWeaponCategory = document.createElement("label");
        labWeaponCategory.textContent = `Sub-Category: ${weaponItem.weaponCategory}`;
        pWeaponDetail.appendChild(labWeaponCategory);

        imgWeapon.addEventListener("mouseover", () => {
            pWeaponDetail.style.opacity = "1";
        });

        imgWeapon.addEventListener("mouseout", () => {
            pWeaponDetail.style.opacity = "0.5";
        })
    });

    //charactor's image
    let divImgCharacter = document.createElement("div");
    divImgCharacter.classList.add("divimgcharacter")
    divCharacter.appendChild(divImgCharacter);

    let imgCharacter = document.createElement("img");
    imgCharacter.src = character.agentImgURL;
    divImgCharacter.appendChild(imgCharacter);

    // team name input area
    let divTeamName = document.createElement("div");
    divTeamName.classList.add("divteamname");
    divMain.appendChild(divTeamName);

    let labTeam = document.createElement("label");
    labTeam.textContent = `Team Name: `;
    divTeamName.appendChild(labTeam);

    let inputTeamName = document.createElement("input");
    inputTeamName.type = "text";
    inputTeamName.id = "teamname";
    divTeamName.appendChild(inputTeamName);

    var ftBtn5 = document.createElement("button");
    ftBtn5.id = "btnsharpyscreen5";
    ftBtn5.classList.add("ftBtn");
    ftBtn5.textContent = "Create Team";
    divTeamName.appendChild(ftBtn5);

    var ftErrorMsg = document.createElement("p");
    ftErrorMsg.id = "errMsg";
    ftErrorMsg.classList.add("ftErrorMsg");
    ftErrorMsg.style.display = "block";
    divTeamName.appendChild(ftErrorMsg);

    ftBtn5.addEventListener("click", teamNameCheck);
}

// show team, use random name
function screen6() {
    let apiUrl = `https://randomuser.me//api?results=3`;
    footer.innerHTML = "";
    divMain.innerHTML = "";
    divMain.style.height = "760px";

    let terroristNow = character.terrorist.replace("-", " ");
    titleLabel.innerText = `${terroristNow} - Team: ${character.teamName}`;
    titleRight.innerHTML = "";

    let divTeamMembers = document.createElement("div");
    divTeamMembers.id = "divteammenbers";
    divTeamMembers.classList.add("divteammenbersFlexContainer");
    divMain.appendChild(divTeamMembers);

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            resultRandomAgentArray = Object.values(data.results);
            console.log("Three random team members name:");
            console.log(resultRandomAgentArray);

            resultRandomAgentArray.forEach((result) => {
                let teammenber = {};
                teammenber.agentName = result.name.first + " " + result.name.last;//team member full name
                let numRandom = getRandomInteger(0, resultAgentArrayFilter.length - 1);

                teammenber.agentDefaultName = resultAgentArrayFilter[numRandom].name;
                teammenber.agentId = resultAgentArrayFilter[numRandom].id;
                teammenber.agentImgURL = resultAgentArrayFilter[numRandom].image;
                teammenber.terrorist = character.terrorist;

                teammenber.weaponArray = getRandomWeaponByCategory();
                const initialValue = 0;
                const spendMoney = teammenber.weaponArray.reduce(
                    (accumulator, currentValue) => accumulator + Number(currentValue.price),
                    initialValue,
                );

                teammenber.Balance = 9000 - spendMoney;
                teamMembers.push(teammenber);

            });
            console.log("Three random team members detail:");
            console.log(teamMembers);


            // show user's agent
            let divUser = document.createElement("div");
            divTeamMembers.id = character.agentId;
            divTeamMembers.appendChild(divUser);

            //character's image
            let divUserImage = document.createElement("div");
            divUserImage.classList.add("agentdiv");
            divUser.appendChild(divUserImage);

            let imgUser = document.createElement("img");
            imgUser.src = character.agentImgURL;
            divUserImage.appendChild(imgUser);

            // character's weapon list
            let divUserWeapon = document.createElement("div");
            divUserWeapon.classList.add("agentweapondiv");
            divUser.appendChild(divUserWeapon);

            for (weapon of weaponArray) {
                let divUserWeaponImageContainer = document.createElement("div");
                divUserWeapon.appendChild(divUserWeaponImageContainer);

                let imgWeapon = document.createElement("img");
                imgWeapon.id = weapon.weaponId;
                imgWeapon.src = weapon.weaponImg;
                divUserWeaponImageContainer.appendChild(imgWeapon);

                let labWeaponName = document.createElement("label");
                labWeaponName.textContent = `${weapon.weaponName} [$${weapon.price}]`;
                divUserWeaponImageContainer.appendChild(labWeaponName);
            }
            // character's name
            let divUserName = document.createElement("label");
            divUserName.textContent = character.agentName;
            divUser.appendChild(divUserName);

            let divUserBalance = document.createElement("label");
            divUserBalance.textContent = `Balance: $${character.Balance}`;
            divUser.appendChild(divUserBalance);

            // show random agents
            for (randomCharacter of teamMembers) {
                let divUser = document.createElement("div");
                divTeamMembers.id = randomCharacter.agentId;
                divTeamMembers.appendChild(divUser);

                //character's image
                let divUserImage = document.createElement("div");
                divUserImage.classList.add("agentdiv");
                divUser.appendChild(divUserImage);

                let imgUser = document.createElement("img");
                imgUser.src = randomCharacter.agentImgURL;
                divUserImage.appendChild(imgUser);

                // character's weapon list
                let divUserWeapon = document.createElement("div");
                divUserWeapon.classList.add("agentweapondiv");
                divUser.appendChild(divUserWeapon);

                for (weapon of randomCharacter.weaponArray) {
                    let divUserWeaponImageContainer = document.createElement("div");
                    divUserWeapon.appendChild(divUserWeaponImageContainer);

                    let imgWeapon = document.createElement("img");
                    imgWeapon.id = weapon.weaponId;
                    imgWeapon.src = weapon.weaponImg;
                    divUserWeaponImageContainer.appendChild(imgWeapon);

                    let labWeaponName = document.createElement("label");
                    labWeaponName.textContent = `${weapon.weaponName} [$${weapon.price}]`;
                    divUserWeaponImageContainer.appendChild(labWeaponName);
                }

                // character's name
                let divUserName = document.createElement("label");
                divUserName.textContent = randomCharacter.agentName;
                divUser.appendChild(divUserName);

                let divUserBalance = document.createElement("label");
                divUserBalance.textContent = `Balance: $${randomCharacter.Balance}`;
                divUser.appendChild(divUserBalance);
            }
        })
        .catch(err => {
            console.error('Error:', err);
        });
}


// get random weapon for team member
function getRandomWeaponByCategory() {
    let teamMemberWeaponArray = [];
    for (categoryItem of category) {
        let resultCategory = resultWeaponArrayFilter.filter((element) => element.category.name == categoryItem);
        let pricePeriod = getPricePeriod(categoryItem, "random");
        let weaponPrice = getRandomPrice(pricePeriod.min, pricePeriod.max);

        let numRandom = getRandomInteger(0, resultCategory.length - 1);
        let weaponFullName = resultCategory[numRandom].name;
        let weaponCategory = getWeaponCategoryName(weaponFullName);
        let weaponName = getWeaponName(weaponFullName);
        let weaponImgURL = resultCategory[numRandom].image;
        let weaponId = resultCategory[numRandom].id;

        // const weaponItem = { category: categoryItem, weaponCategory: weaponCategory, weaponName: weaponName, price: weaponPrice, weaponImg: weaponImgURL, weaponId: weaponId };
        const weaponItem = new chosenWeaponDetail(categoryItem, weaponCategory, weaponName, weaponPrice, weaponImgURL, weaponId);
        teamMemberWeaponArray.push(weaponItem);
    }

    return teamMemberWeaponArray;
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// check if the banlance enough
function checkBanlance() {
    let ftErrorMsg = document.getElementById("errMsg");
    if (weaponArray.length < 1) {
        ftErrorMsg.textContent = "Please select weapon";
        return false;
    }

    const initialValue = 0;
    const spendMoney = weaponArray.reduce(
        (accumulator, currentValue) => accumulator + Number(currentValue.price),
        initialValue,
    );

    character.Balance = 9000 - spendMoney;
    // update balance
    titleRight.innerHTML = `Balance: $${character.Balance}`;

    if (character.Balance < 0) {
        ftErrorMsg.textContent = "Insufficient balance, please change your selected weapon";
        return false;
    }
    return true;
}

// check if all categories select at least one weapon
function checkSelectWeapon(category) {
    var bFlag = true;
    let ftErrorMsg = document.getElementById("errMsg");
    if (weaponArray.length < 1) {
        ftErrorMsg.textContent = "Please select weapon";
        return false;
    }

    for (categoryItem of category) {
        const foundItem = weaponArray.find((item) => item.category == categoryItem);
        if (foundItem == undefined) {
            ftErrorMsg.textContent = `Category [${categoryItem}] haven't chosen weapon`;
            bFlag = false;
            break;
        }
    }
    return bFlag;
}

// replace the whitespace in weapon name
function changeWeaponNameFormat(weaponName) {
    return weaponName.replace(" ", "-");
}

function getWeaponCategoryName(weaponInfo) {
    let template = String(weaponInfo);
    let seperateIndex = template.indexOf('|');
    let weaponCategoryName = template.substring(0, seperateIndex).trimEnd();

    if (weaponCategoryName === "") return "*"; //for no sub-category weapons
    else return weaponCategoryName;
}

function getWeaponName(weaponInfo) {
    let template = String(weaponInfo);
    let seperateIndex = template.indexOf('|');
    let weaponName = template.substring(seperateIndex + 1).trimStart();
    return weaponName;
}
// get the price period by categoty
function getPricePeriod(category, type) {
    if (category === "Pistols") return { min: 200, max: 700 };
    if (category === "SMGs") return { min: 1000, max: 1500 };
    if (category === "Rifles") {
        if (type === "real")//real scope
            return { min: 1500, max: 3500 };
        else//Preventing random price going out of $9000, narrow this scope
            return { min: 1500, max: 2300 };
    }
    if (category === "Heavy") {
        if (type === "real")//real scope
            return { min: 2500, max: 4500 };
        else //Preventing random price going out of $9000, narrow this scope
            return { min: 2500, max: 3500 };
    }
    if (category === "Knives") return { min: 100, max: 500 };
    if (category === "Gloves") return { min: 100, max: 500 };
}

// get a random price for weapon
function getRandomPrice(min, max) {
    // Calculate the range between min and max, inclusive
    var range = (max - min) / 50 + 1;

    // Generate a random integer within the range
    var randomNumber = Math.floor(Math.random() * range);

    // Calculate the random number based on the generated integer and ensure it's a multiple of 50
    var result = min + (randomNumber * 50);

    // Ensure the result does not exceed the maximum value
    return result <= max ? result : max;
}

function terrorist() {
    character.terrorist = "Terrorist";
    screen3();
}

function counterTerrorist() {
    character.terrorist = "Counter-Terrorist";
    screen3();
}

function autoSelect() {
    let numRandom = getRandomArbitrary(1, 2);
    if (numRandom <= 1.5) {
        getElementById("terrorist").click();
    } else {
        getElementById("counterterrorist").click();
    }
}

// screen3 agent name sharp check
function agentNameCheck() {
    let errMsg = getElementById("errMsg");
    errMsg.innerText = '';
    if (character.agentId == null) {
        errMsg.innerText = 'Please choose an agent';
        return;
    } else {
        // check character's name.The character name must not exceed more than 2 words and the letter count must not exceed 20.
        var ftText = getElementById("ftText");
        var ftTextValue = ftText.value;
        if (ftTextValue === "" || ftTextValue === null) {
            errMsg.innerText = 'Please input character name';
            ftText.focus();
            return;
        }
        if (wordsLen(ftTextValue) > 2) {
            errMsg.innerText = 'Character name can not exceed more than 2 words';
            ftText.focus();
            return;
        }
        if (ftTextValue.length > 20) {
            errMsg.innerText = 'Character letter count can not exceed 20';
            ftText.focus();
            return;
        }
        character.agentName = ftTextValue;
        screen4();
    }
}

// screen5 team name sharp check
function teamNameCheck() {
    let errMsg = getElementById("errMsg");
    errMsg.innerText = '';
    var ftText = getElementById("teamname");
    var teamNameValue = ftText.value;
    if (teamNameValue === "" || teamNameValue === null) {
        errMsg.innerText = 'Please input team name';
        ftText.focus();
        return;
    }
    // The team name must be a single word of alphabetical characters(symbols/numbers are not allowed)
    if (wordsLen(teamNameValue) > 1) {
        errMsg.innerText = 'Team name can not exceed more than 1 words';
        ftText.focus();
        return;
    }
    if (!wordsFormat(teamNameValue)) {
        errMsg.innerText = 'Symbols and numbers are not allowed';
        ftText.focus();
        return;
    }
    character.teamName = teamNameValue;

    console.log("User's character:");
    console.log(character);
    console.log("User's weapons detail:");
    console.log(weaponArray);
    screen6();
}

function wordsLen(str) {
    const array = str.trimStart().trimEnd().split(" ");
    return array.length;
}

function wordsFormat(str) {
    const teamName_regex = new RegExp('^[a-zA-Z]+$');
    if (teamName_regex.test(str)) {
        return true;
    }
    return false;
}

screen1();