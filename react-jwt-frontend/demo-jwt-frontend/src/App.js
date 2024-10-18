import React, { useState } from "react";
import FormComponent from "./components/FormComponent";
import DashboardComponent from "./components/DashboardComponent";

const App = () => {
  const [token, setToken] = useState("no token present");

  const handleLogin = (newToken) => {
    setToken(newToken); // Set the token on successful login
    localStorage.setItem("token", newToken); // Optionally store the token locally
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="space-y-10">
        <FormComponent onLogin={handleLogin} />
        <DashboardComponent token={token} />
      </div>
    </main>
  );
};

export default App;


console.log(1+false);//1
console.log(1+true); //2
console.log(1-false);//1
console.log(1+'2'-1); //11  
console.log(1+null) // 1+0
console.log(1+undefined);//1+nan=nan
console.log(1+NaN);//1+nan=nan
console.log(1+Infinity);//1+inf=inf
console.log(1+'2'+'3'-1);//12+3-1=15
console.log(1+'hello');//1hello
