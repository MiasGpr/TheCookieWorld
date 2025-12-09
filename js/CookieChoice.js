		
		
		let CookieChoice;
		let TabCookies = ["Fraise", "Vanille", "Chocolat"];
		let CookieCount = [0,0,0];
		let Total = 0;
		let perFRA = 0;
		let perVAN = 0;
		let perCHO = 0;
		let CounterFRA= 0;
		let CounterVAN= 0;
		let CounterCHO= 0;
				
				if (
					(CookieChoice !== "Vanille" && CookieChoice !== "Fraise" && CookieChoice !== "Chocolat") || CookieChoice <= 0 || CookieChoice >= 127
					) {
						alert("invalid input number or non existant choice");
					  }
					do{
						CookieChoice = prompt("Saisissez votre cookie preferé : Fraise, Vanille, Chocolat(Tapez 'non' si vous voulez quittez)" );
						if ((CookieChoice !== "Vanille" && CookieChoice !== "Fraise" && CookieChoice !== "Chocolat") || CookieChoice <= 0 || CookieChoice >= 127) 
						{
							alert("invalid input number or non existant choice");
					 	}
						if(CookieChoice == "Fraise")
				{
						CookieCount[0]++;
						CounterFRA = CounterFRA +1;
				}
						else if(CookieChoice == "Vanille")
				{
						CookieCount[1]++;
						CounterVAN = CounterVAN +1;
				}
						else if(CookieChoice == "Chocolat")
				{
						CookieCount[2]++;
						CounterCHO =CounterCHO +1;
				}}while(CookieChoice !="non")
					// if(CookieChoice!="Vanille"||CookieChoice!="Fraise"||CookieChoice!="Chocolat" ||CookieChoice <= '0' || CookieChoice >='127')
					// 	{
					// 		alert("invalid input number or non existant choice");
					// 	}

				
				
				Total = CounterFRA+CounterVAN+CounterCHO;

				perFRA = CounterFRA * 100 /Total;
				perFRA = perFRA.toFixed(0);

				perVAN = CounterVAN * 100 /Total;
				perVAN = perVAN.toFixed(0);

				perCHO = CounterCHO * 100 /Total;
				perCHO = perCHO.toFixed(0);

				document.getElementById('Fraise').innerText = perFRA+"%";
				document.getElementById('Vanille').innerText = perVAN+"%";
				document.getElementById('Chocolat').innerText = perCHO+"%";


				document.getElementById('Counterfr').innerText = CounterFRA;
				document.getElementById('Counterva').innerText = CounterVAN;
				document.getElementById('Counterch').innerText = CounterCHO;
				document.getElementById('Total').innerText = Total;

				