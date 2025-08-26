
document.addEventListener("DOMContentLoaded", function() {
    
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-card"); 
    
    // return true or false based on a regex
    function validatUsername(username) {
        if(username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isValid = regex.test(username);
        if(!isValid) {
            alert("Invalid username");
        }
        return isValid;
        
    }

    async function fetchUserDetails(username) {
        
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`
        try{

            searchButton.textContent = "Loading...";
            searchButton.disabled = true;

            const response = await fetch(url);

            if(!response.ok) {
                throw new Error("Network response was not ok");
            
            }
            const parsedData = await response.json();
            console.log("logging data", parsedData);

            displayUserData(parsedData);
        }

        catch(error) {
            statsContainer.innerHTML = `<p>${error.message}</p>`
        }
        finally{
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function updateProgress(solved, total, label, circle) {
        const progressDegree = (solved/total)*100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }
    function displayUserData(parsedData) {
        const totalEasyQues = parsedData.totalEasy;
        const totalMediumQues = parsedData.totalMedium;
        const totalHardQues = parsedData.totalHard;
        
        const solvedEasyQues = parsedData.easySolved;
        const solvedMediumQues = parsedData.mediumSolved;
        const solvedHardQues = parsedData.hardSolved;

        updateProgress(solvedEasyQues, totalEasyQues, easyLabel, easyProgressCircle);
        updateProgress(solvedMediumQues, totalMediumQues, mediumLabel, mediumProgressCircle);
        updateProgress(solvedHardQues, totalHardQues, hardLabel, hardProgressCircle);

        const cardsData = [
            {label: "Acceptance Rate", value:parsedData.acceptanceRate},
            {label: "Ranking", value: parsedData.ranking},
            {label: "Easy", value: solvedEasyQues},
            {label: "Medium", value: solvedMediumQues},
            {label: "Hard", value: solvedHardQues},
            {label: "Total", value: parsedData.totalSolved}
        ];

        console.log("card ka data", cardsData);

        cardStatsContainer.innerHTML = cardsData.map(
            data => {
                return `
                    <div class="card">
                    <h3>${data.label}</h3>
                    <p>${data.value}</p>
                    </div>
                `
            }
        ).join("");


    }
    searchButton.addEventListener('click', function() {
        const username = usernameInput.value;
        console.log("logging username:", username);
        if(validatUsername(username)) {
            fetchUserDetails(username); 
        }
    });
})




// If the API dosen't work, alternate way is to use a proxy server and use graphql API from leetcode
        // const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
            // const targetUrl = 'https://leetcode.com/graphql/';

            // concantenated url : https://cors-anywhere.herokuapp.com/https://leetcode.com/graphql/

            // const myHeaders = new Headers();
            // myHeaders.append("content-type", "application/json");
            // myHeaders.append("Referer", "https://leetcode.com/");

            // const graphql = JSON.stringify({
            //     query: "\n    query userSessionProgress($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(\n    username: $username\n  ) {\n    submitStats {\n      acSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n      totalSubmissionNum {\n        difficulty\n        count\n      }\n    }\n  }\n}\n  ",
            //     variables: {"username": `$username`}
            // })

            // const requestOptions = {
            //     method: "POST",
            //     headers: myHeaders,
            //     body: graphql,
            //     redirect: "follow"
            // };

            // const response = await fetch(proxyUrl+targetUrl, requestOptions);