import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';
import { pie, arc } from 'd3-shape';

import { useTripsContext } from '../contexts/tripsContext';
import { useCurrencyContext } from '../contexts/currencyContext';

const DonutPieChart = ({ width = 300, height = 300 }) => {
  const [totalPerCategory, setTotalPerCategory] = useState({});
  const {
    pinnedTrip,
    calculateTotalSpent,
    calculateTripDuration,
    calculateDailyAverage,
  } = useTripsContext();
  const { getCurrencySymbol } = useCurrencyContext();

  const categories = [
    { id: 1, name: 'Accommodation', color: '#d9ab7a' },
    { id: 2, name: 'Activities', color: '#e17559' },
    { id: 3, name: 'Groceries', color: '#771200' },
    { id: 4, name: 'Restaurants', color: '#fda541' },
    { id: 5, name: 'Services', color: '#f24f13' },
    { id: 6, name: 'Shopping', color: '#cb1c2d' },
    { id: 7, name: 'Taxes & Fees', color: '#04d9b2' },
    { id: 8, name: 'Transportation', color: '#00b0a3' },
    { id: 9, name: 'Others', color: '#0f333f' },
  ];

  const calculateTotalSpentPerCategory = expenses => {
    const totalSpentPerCategory = {};

    expenses.forEach(expense => {
      const spent = expense.convertedAmount || expense.value;
      if (!totalSpentPerCategory[expense.categoryName]) {
        totalSpentPerCategory[expense.categoryName] = 0;
      }
      totalSpentPerCategory[expense.categoryName] += spent;
    });

    return totalSpentPerCategory;
  };

  useEffect(() => {
    if (pinnedTrip && pinnedTrip.expenses) {
      setTotalPerCategory(calculateTotalSpentPerCategory(pinnedTrip.expenses));
    }
  }, [pinnedTrip]);

  // Prepare data for the pie chart
  const data = categories
    .map(category => ({
      ...category,
      value: totalPerCategory[category.name] || 0,
    }))
    .filter(category => category.value > 0);

  const radius = Math.min(width, height) / 2;
  const pieChart = pie()
    .value(d => d.value)
    .sort(
      (a, b) =>
        categories.findIndex(cat => cat.name === a.label) -
        categories.findIndex(cat => cat.name === b.label),
    )(data);
  const createArc = arc()
    .innerRadius(radius * 0.45)
    .outerRadius(radius);

  const totalSpent = calculateTotalSpent(pinnedTrip);
  const tripDuration = calculateTripDuration(pinnedTrip);
  const dailyAverage = calculateDailyAverage(totalSpent, tripDuration);
  const tripCurrencySymbol = pinnedTrip
    ? getCurrencySymbol(pinnedTrip.currency)
    : '';

  // Here we will handle the download button
  const handleDownload = () => {
    // We can use libraries like react-native-fs or
    // react-native-fetch-blob to handle file downloads
    console.log('Download button pressed');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Download Button */}
      <View style={styles.containerDownloadButton}>
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={handleDownload}
        >
          <AntDesign
            name="download"
            size={28}
            color="black"
            style={{ fontSize: 32 }}
          />
        </TouchableOpacity>
      </View>
      {/* Daily Average Amount */}
      <View style={styles.containerDailyAverage}>
        <Text style={styles.dailyAverage}>
          Daily Average : {dailyAverage} {tripCurrencySymbol}
        </Text>
      </View>

      {/* Pie Chart */}
      <View style={styles.containerChart}>
        <Svg width={width} height={height}>
          <G x={width / 2} y={height / 2}>
            {pieChart.map((slice, index) => {
              const [centroidX, centroidY] = createArc.centroid(slice);
              return (
                <G key={index}>
                  <Path d={createArc(slice)} fill={slice.data.color} />
                  <SvgText
                    x={centroidX}
                    y={centroidY}
                    fill="white"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontSize="16"
                    stroke="#000"
                    strokeWidth={0.1}
                    fontWeight="bold" // Set the font weight here
                  >
                    {`${((slice.data.value / data.reduce((acc, cur) => acc + cur.value, 0)) * 100).toFixed(1)}%`}
                  </SvgText>
                </G>
              );
            })}
          </G>
        </Svg>
      </View>

      <View style={styles.categories}>
        {data.map(item => (
          <View style={styles.categoryItem} key={item.id}>
            <View
              style={[styles.colorIndicator, { backgroundColor: item.color }]}
            ></View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.categoryName}>{item.name}</Text>
              </View>
              <Text style={styles.valueCategory}>
                {item.value ? item.value.toFixed(2) : 0}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerDownloadButton: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  downloadButton: {
    marginTop: 45,
    marginEnd: 25,
  },
  containerDailyAverage: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  dailyAverage: {
    color: '#00b0a3',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 30,
  },
  containerChart: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    marginTop: 15,
  },
  categories: {
    marginTop: 50,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 30,
  },
  categoryItem: {
    flexDirection: 'row',
    marginBottom: 8,
    backgroundColor: 'lightgray',
    borderRadius: 8,
    padding: 10,
    width: 350,
  },
  colorIndicator: {
    marginTop: 6,
    marginRight: 8,
    width: 24,
    height: 24,
    borderRadius: 3,
  },
  categoryName: {
    color: '#7d7b7b',
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 5,
  },
  valueCategory: {
    color: '#7d7b7b',
    fontSize: 18,
  },
});

export default DonutPieChart;
