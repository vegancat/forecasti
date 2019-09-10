import React from "react";
import {ResponsiveLine} from "@nivo/line";

const dataAnalyzer = (data, gmtOffset) => {
    const charts = [];
    let tempData = [], humidityData = [], pressureData = [], windSpeedData = [], cloudData = [], weatherData = [];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    for (let i = 0; i <= 32; i = i + 8) {
        for (let j = i; j < i + 8; j++) {
            let year = data[j].dt_txt.slice(0, 4);
            let month = data[j].dt_txt.slice(5, 7);
            let day = data[j].dt_txt.slice(8, 10);
            let hour = data[j].dt_txt.slice(11, 13);
            let minute = data[j].dt_txt.slice(14, 16);
            let utcDate = new Date(year, month, day, hour, minute);
            let localDate = new Date(utcDate.getTime() + gmtOffset);
            year = localDate.getFullYear();
            month = months[localDate.getMonth() - 1];
            day = localDate.getDate();
            hour = localDate.getHours();
            minute = localDate.getMinutes();

            if (j === i || j === i + 7) {
                tempData[j] = {
                    x: `${month}-${day} ${hour}:${minute}`,
                    y: (data[j].main.temp - 273.15).toFixed(1)
                };
                humidityData[j] = {
                    x: `${month}-${day} ${hour}:${minute}`,
                    y: data[j].main.humidity
                };
                pressureData[j] = {
                    x: `${month}-${day} ${hour}:${minute}`,
                    y: (data[j].main.pressure / 1013.25).toFixed(1)
                };
                windSpeedData[j] = {
                    x: `${month}-${day} ${hour}:${minute}`,
                    y: data[j].wind.speed
                };
                cloudData[j] = {
                    x: `${month}-${day} ${hour}:${minute}`,
                    y: data[j].clouds.all
                };
                weatherData[j] = {
                    description: data[j].weather[0].description,
                    main: data[j].weather[0].main
                };
            } else {
                tempData[j] = {
                    x: `${hour}:${minute}`,
                    y: (data[j].main.temp - 273.15).toFixed(1)
                };
                humidityData[j] = {
                    x: `${hour}:${minute}`,
                    y: data[j].main.humidity
                };
                pressureData[j] = {
                    x: `${hour}:${minute}`,
                    y: (data[j].main.pressure / 1013.25).toFixed(1)
                };
                windSpeedData[j] = {
                    x: `${hour}:${minute}`,
                    y: data[j].wind.speed
                };
                cloudData[j] = {
                    x: `${hour}:${minute}`,
                    y: data[j].clouds.all
                };
                weatherData[j] = {
                    description: data[j].weather[0].description,
                    main: data[j].weather[0].main
                };
            }
        }
    }

    let cloud_humid_data = [];
    let wind_pressure_temp_data = [];


    for (let i = 0; i <= 32; i = i + 8) {

        let rawTempData = tempData.slice(i, i + 8);
        let tempChartData = {
            id: "Temperature(C)",
            color: "hsl(345, 70%, 50%)",
            data: rawTempData
        };

        let rawHumidityData = humidityData.slice(i, i + 8);
        let humidityChartData = {
            id: "Humidity(%)",
            color: "hsl(159, 70%, 50%)",
            data: rawHumidityData
        };

        let rawCloudData = cloudData.slice(i, i + 8);
        let cloudChartData = {
            id: "Cloudiness(C)",
            color: "hsl(259, 70%, 50%)",
            data: rawCloudData
        };

        let rawPressureData = pressureData.slice(i, i + 8);
        let pressureChartData = {
            id: "Pressure(hAtm)",
            color: "hsl(338, 70%, 50%)",
            data: rawPressureData
        };

        let rawWindSpeedData = windSpeedData.slice(i, i + 8);
        let windSpeedChartData = {
            id: "Wind(m/s)",
            color: "hsl(51, 70%, 50%)",
            data: rawWindSpeedData
        };

        cloud_humid_data.push([cloudChartData, humidityChartData]);
        wind_pressure_temp_data.push([windSpeedChartData, pressureChartData, tempChartData]);

    }
    console.log(wind_pressure_temp_data);

    // console.log(windSpeedData); //0-5
    // console.log(pressureData);//hAtmosphere-->*100
    // console.log(humidityData); //%
    // console.log(tempData); //c


    return {
        cloud_humid_data: cloud_humid_data,
        wind_pressure_temp_data: wind_pressure_temp_data,
        windSpeedData: windSpeedData,
        pressureData: pressureData,
        cloudData: cloudData,
        humidityData: humidityData,
        tempData: tempData,
        weatherData: weatherData
    }
};

export default dataAnalyzer;