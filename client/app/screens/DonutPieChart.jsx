import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import PieChart from 'react-native-pie-chart';

const DonutPieChart = () => {
  const handleDownload = () => {
    // We can use libraries like react-native-fs or
    // react-native-fetch-blob to handle file downloads
    console.log('Download button pressed');
  };
  const widthAndHeight = 280;
  const series = [123, 221, 123, 289, 237, 234, 220, 222, 225];
  const sliceColor = [
    '#d9ab7a',
    '#e17559',
    '#771200',
    '#fda541',
    '#f24f13',
    '#cb1c2d',
    '#04d9b2',
    '#00b0a3',
    '#0f333f',
  ];
  const categories = [
    {
      id: 1,
      name: 'Accommodation',
      color: '#d9ab7a',
    },
    {
      id: 2,
      name: 'Activities',
      color: '#e17559',
    },
    {
      id: 3,
      name: 'Groceries',
      color: '#771200',
    },
    {
      id: 4,
      name: 'Restaurants',
      color: '#fda541',
    },
    {
      id: 5,
      name: 'Services',
      color: '#f24f13',
    },
    {
      id: 6,
      name: 'Shopping',
      color: '#cb1c2d',
    },
    {
      id: 7,
      name: 'Taxes & Fees',
      color: '#04d9b2',
    },
    {
      id: 8,
      name: 'Transportation',
      color: '#00b0a3',
    },
    {
      id: 9,
      name: 'Others',
      color: '#0f333f',
    },
  ];

  return (
    <ScrollView>
      <View className="flex-1, p-20">
        <TouchableOpacity
          className="absolute top-16 right-6"
          onPress={handleDownload}
        >
          <AntDesign
            name="download"
            size={28}
            color="black"
            style={{ fontSize: 32 }}
          />
        </TouchableOpacity>

        <View className="flex justify-center">
          <View>
            <PieChart
              widthAndHeight={widthAndHeight}
              series={series}
              sliceColor={sliceColor}
              doughnut={false}
              coverRadius={0.45}
            />
          </View>
          <View className="mt-20">
            {categories.map(item => (
              <View className="flex flex-row " key={item.id}>
                <View
                  className={`justify-center p-5 bg-${item.color} rounded-10 w-16 h-1`}
                ></View>
                <View>
                  <Text className="text-black text-lg">{item.name}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DonutPieChart;
