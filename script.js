initBattery()

function initBattery() {
    const batteryLiquid = document.querySelector('.battery__liquid'),
        batteryStatus = document.querySelector('.battery__status'),
        battaryPercentage = document.querySelector('.battery__percentage'),
        battaryInfo = document.querySelector('.other__info');;


    navigator.getBattery().then((batt) => {
        updateBattery = () => {
            let level = Math.floor(batt.level * 100)
            battaryPercentage.innerHTML = level + "%"

            batteryLiquid.style.height = `${parseInt(batt.level * 100)}%`

            if (level == 100) {
                batteryStatus.innerHTML = `Full battery <i class="ri-battery-2-fill green-color"></i>`
                batteryLiquid.style.height = "103%"
            } else if (level <= 20 & !batt.charging) {
                batteryStatus.innerHTML = `Low battery <i class="ri-plug-line animated-red"></i>`
            } else if (batt.charging) {
                batteryStatus.innerHTML = `Charging... <i class="ri-flashlight-line animated-green"></i>`
                if (batt.chargingTime !== Infinity) {
                    battaryInfo.innerHTML = `Charging: ${Math.trunc(parseInt(batt.chargingTime/60)/60)}h. ${parseInt(batt.chargingTime/60)%60}min`
                } else {
                    battaryInfo.innerHTML = ""
                }
            } else if (!batt.charging && batt.dischargingTime !== Infinity) {
                battaryInfo.innerHTML = `Discharging: ${Math.trunc(parseInt(batt.dischargingTime/60)/60)}h. ${parseInt(batt.dischargingTime/60)%60}min`
            } else {
                batteryStatus.innerHTML = ''
                battaryInfo.innerHTML = ""
            }

            if (level <= 20) {
                batteryLiquid.classList.add('gradient-color-red')
                batteryLiquid.classList.remove('gradient-color-orange', 'gradient-color-yellow', 'gradient-color-green')
            } else if (level <= 40) {
                batteryLiquid.classList.add('gradient-color-orange')
                batteryLiquid.classList.remove('gradient-color-red', 'gradient-color-yellow', 'gradient-color-green')
            } else if (level <= 80) {
                batteryLiquid.classList.add('gradient-color-yellow')
                batteryLiquid.classList.remove('gradient-color-red', 'gradient-color-orange', 'gradient-color-green')
            } else {
                batteryLiquid.classList.add('gradient-color-green')
                batteryLiquid.classList.remove('gradient-color-red', 'gradient-color-orange', 'gradient-color-yellow')
            }

        }
        updateBattery()
        batt.addEventListener('chargingchange', () => {
            updateBattery()
        })
        batt.addEventListener('levelchange', () => {
            updateBattery()
        })
    })
}