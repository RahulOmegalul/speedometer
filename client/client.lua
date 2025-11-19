local function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
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
        toggleNuiFrame(true)
    end

      local speedometerData = {
        speed = math.floor(GetEntitySpeed(vehicle) * 3.6), -- Convert m/s to km/h
        fuel = math.floor(GetVehicleFuelLevel(vehicle)),
        rpm = math.floor((GetVehicleCurrentRpm(vehicle) or 0) * 10000),
        gear = GetVehicleCurrentGear(vehicle),
        isEngineOn = GetIsVehicleEngineRunning(vehicle)
      }

      updateSpeedometer(speedometerData)

      Wait(100)
    else 
      if isSpeedometerVisible then
        toggleNuiFrame(false)
      end
      Wait(500)
    end
  end
end)
