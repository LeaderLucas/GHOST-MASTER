// LOAD MEMBERS
let members = JSON.parse(localStorage.getItem("members")) || [
{name:"Lucas_Arora",rank:10,level:40,password:"lucas9389",money:0,war:0},
{name:"Arushkumar_Kumar",rank:9,level:36,password:"arush6327",money:0,war:0},
{name:"Don_Abhishek",rank:8,level:19,password:"abhishek7419",money:120,war:0},
{name:"Sheikh_Himanshu",rank:8,level:7,password:"himanshu8642",money:0,war:0},
{name:"Pradyum_Ivanov",rank:8,level:24,password:"pradyum5931",money:0,war:0}
];

// SAVE DATA
function saveData(){ 
    localStorage.setItem("members",JSON.stringify(members)); 
}

// MONEY FORMAT
function formatMoney(m){
    if(m>=1000000) return Math.floor(m/1000000)+"m";
    if(m>=1000) return Math.floor(m/1000)+"k";
    return m;
}

// LOGIN
function login(){
    let name=document.getElementById("name").value.trim();
    let rank=parseInt(document.getElementById("rank").value);
    let pass=document.getElementById("password").value;

    let user=members.find(m=>m.name===name && m.rank===rank && m.password===pass);

    if(!user){ 
        alert("Wrong Login ❌"); 
        return; 
    }

    localStorage.setItem("user",JSON.stringify(user));
    openDashboard();
}

// DASHBOARD
function openDashboard(){
    let user=JSON.parse(localStorage.getItem("user"));

    document.getElementById("loginPage").style.display="none";
    document.getElementById("dashboard").style.display="block";
    document.getElementById("welcome").innerHTML="👋 Welcome " + user.name;

    // Reset buttons (important fix)
    document.getElementById("adminBtn").style.display="inline-block";
    document.getElementById("deputyBtn").style.display="inline-block";

    // Access control
    if(user.rank < 10){
        document.getElementById("adminBtn").style.display="none";
    }

    if(user.rank != 9){
        document.getElementById("deputyBtn").style.display="none";
    }
}

// OPEN PAGE
function openPage(page){
    document.getElementById("dashboard").style.display="none";
    document.getElementById("page").style.display="block";

    let content=document.getElementById("content");
    let user=JSON.parse(localStorage.getItem("user"));

    // MEMBERS
    if(page==="members"){
        document.getElementById("title").innerHTML="Members";

        let html="<table><tr><th>#</th><th>Name</th><th>Rank</th><th>Lvl</th></tr>";

        members.forEach((m,i)=>{
            let name = `<span class="rainbowName" onclick="openProfile(${i})" style="cursor:pointer">${m.name}</span>`;
            html+=`<tr><td>${i+1}</td><td>${name}</td><td>${m.rank}</td><td>${m.level}</td></tr>`;
        });

        html+="</table>";
        content.innerHTML=html;
    }

    // PLAYERS INFO
    if(page==="players"){
        document.getElementById("title").innerHTML="Players Info";

        let html="<table><tr><th>Name</th><th>Contribution</th><th>War</th><th>Action</th></tr>";

        members.forEach((m,i)=>{
            let action="";
            if(user.rank==10){
                action=`<button onclick="addWar(${i})">+1</button>
                        <button onclick="removeWar(${i})">-1</button>`;
            }

            html+=`<tr>
            <td class="rainbowName">${m.name}</td>
            <td>${formatMoney(m.money)}</td>
            <td>${m.war}</td>
            <td>${action}</td>
            </tr>`;
        });

        html+="</table>";
        content.innerHTML=html;
    }

    // RULES
    if(page==="warRules"){
        document.getElementById("title").innerHTML="Family War Rules";
        content.innerHTML="⚔️ Follow war rules strictly!";
    }

    if(page==="deputyRules"){
        document.getElementById("title").innerHTML="Deputy Rules";
        content.innerHTML="Deputy handles team in absence of leader.";
    }

    if(page==="staffRules"){
        document.getElementById("title").innerHTML="Staff Rules";
        content.innerHTML="Staff must be active & loyal.";
    }

    if(page==="warning"){
        document.getElementById("title").innerHTML="Warnings";
        content.innerHTML="No warnings yet.";
    }

    // ADMIN PANEL
    if(page==="admin"){
        document.getElementById("title").innerHTML="Admin Panel";

        content.innerHTML=`
        <h3>Add Member</h3>
        <input id="newName" placeholder="Name">
        <input id="newRank" placeholder="Rank">
        <input id="newLevel" placeholder="Level">
        <input id="newPass" placeholder="Password">
        <button onclick="addMember()">Add</button>

        <h3>Deposit</h3>
        <input id="memberIndex" placeholder="Index">
        <input id="depositAmount" placeholder="Amount">
        <button onclick="addDeposit()">Add</button>`;
    }
}

// BACK
function back(){
    document.getElementById("page").style.display="none";
    document.getElementById("dashboard").style.display="block";
}

// LOGOUT (⚠️ FIXED)
function logout(){
    localStorage.removeItem("user"); // only logout user
    location.reload();
}

// ADD MEMBER
function addMember(){
    let name=document.getElementById("newName").value;
    let rank=parseInt(document.getElementById("newRank").value);
    let level=parseInt(document.getElementById("newLevel").value);
    let pass=document.getElementById("newPass").value;

    if(!name || !rank || !level || !pass){
        alert("Fill all fields!");
        return;
    }

    members.push({name,rank,level,password:pass,money:0,war:0});
    saveData();
    alert("Member Added ✅");
}

// ADD DEPOSIT
function addDeposit(){
    let i=parseInt(document.getElementById("memberIndex").value);
    let amount=parseInt(document.getElementById("depositAmount").value);

    if(!members[i]){
        alert("Invalid member!");
        return;
    }

    members[i].money+=amount;
    saveData();
    alert("Deposit Added 💰");
}

// WAR SYSTEM
function addWar(i){ members[i].war++; saveData(); openPage("players"); }
function removeWar(i){ if(members[i].war>0) members[i].war--; saveData(); openPage("players"); }

// PROFILE
function openProfile(i){
    let m = members[i];

    document.getElementById("dashboard").style.display="none";
    document.getElementById("page").style.display="block";

    document.getElementById("title").innerHTML = m.name + " Profile";

    document.getElementById("content").innerHTML = `
    <div>
    <h3>${m.name}</h3>
    <p>Rank: ${m.rank}</p>
    <p>Level: ${m.level}</p>
    <p>Money: ${formatMoney(m.money)}</p>
    <p>War: ${m.war}</p>
    </div>`;
}

// AUTO LOGIN
if(localStorage.getItem("user")) openDashboard();
