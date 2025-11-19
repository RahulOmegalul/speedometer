local function toggleNuiFrame(shouldShow)
  -- Don't set NUI focus for the speedometer - it's just a display element
  -- SetNuiFocus(shouldShow, shouldShow)  -- Remove this line
  SendReactMessage('setVisible', shouldShow)
end

RegisterCommand('show-nui', function()
  toggleNuiFrame(true)
  debugPrint('Show NUI frame')
end)

RegisterNUICallback('hideFrame', function(_, cb)
  toggleNuiFrame(false)
  debugPrint('Hide NUI frame')
  cb({})
end)

local function updateSpeedometer(data)
  SendReactMessage('updateSpeedometer', data)
end

local isSpeedometerVisible = false

CreateThread(function()
  while true do 
    local playerPed = PlayerPedId()
    local vehicle = GetVehiclePedIsIn(playerPed, false)

    if vehicle ~= 0 and GetPedInVehicleSeat(vehicle, -1) == playerPed then
      if not isSpeedometerVisible then
        isSpeedometerVisible = true
        toggleNuiFrame(true)
      end

    local gear = GetVehicleCurrentGear(vehicle);
    local speedY = GetEntitySpeedVector(vehicle, true).y;
    if gear == 0 and speedY < 1.0 then
      gear = -1 -- Reverse gear
    end
    

      local speedometerData = {
        speed = math.floor(GetEntitySpeed(vehicle) * 3.6), -- Convert m/s to km/h
        fuel = math.floor(GetVehicleFuelLevel(vehicle)),
        rpm = math.floor((GetVehicleCurrentRpm(vehicle) or 0) * 10000),
        gear = gear,
        isEngineOn = GetIsVehicleEngineRunning(vehicle),
        maxSpeed = math.floor(GetVehicleHandlingFloat(vehicle, 'CHandlingData', 'fInitialDriveMaxFlatVel') * 3.6)
      }

      updateSpeedometer(speedometerData)

      Wait(100)
    else 
      if isSpeedometerVisible then
        isSpeedometerVisible = false
        toggleNuiFrame(false)
      end
      Wait(500)
    end
  end
end)