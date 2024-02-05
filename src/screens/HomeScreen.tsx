import React, {useState} from 'react'
import { StatusBar, 
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  TouchableOpacity,
  TextInput } from 'react-native'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import CustomIcon from '../components/CustomIcon'

const getCategoriesFromData = (data: any) => {
  let temp:any = {}
  for(let i=0; i < data.length;i++){
    if(temp[data[i].name] == undefined){
      temp[data[i].name] = 1
    }else{
      temp[data[i].name]++
    }
  }
  let categories = Object.keys(temp)
  categories.unshift('All')
  return categories
}

const getCoffeeList = (category:string, data:any) =>{
  if(category == 'All'){
    return data;
  } else {
    let coffeelist = data.filter((item:any) => item.name == category)
    return coffeelist
  }
}

const HomeScreen = () => {
  const CoffeeList = useStore((state: any) => state.CoffeeList)
  const BeanList = useStore((state: any) => state.BeanList)
  const [categories, setCatigories] = useState(getCategoriesFromData(CoffeeList))
  const [searchText, setSearchText] = useState('')
  const [categoryIndex, setCatigoryIndex] = useState({
    index:1,
    category: categories[1]
  }) 
  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category,CoffeeList)
    )

  const tabBarHeight = useBottomTabBarHeight()

  // console.log("categories =", categories);
  

  return <View style={styles.ScreenContainer}>
    <StatusBar backgroundColor={COLORS.primaryBlackHex}></StatusBar>
    <ScrollView 
    showsVerticalScrollIndicator={false} 
    contentContainerStyle={styles.ScrollViewFlex}>
      {/* App header */}
      <HeaderBar></HeaderBar>
      <Text style={styles.ScreenTitle}>Find the best{'\n'}coffee for you</Text>
      {/*  Search Input */}
      <View style={styles.InputContainerComponent}>
        <TouchableOpacity onPress={()=>{}}>
          <CustomIcon name="search" 
          size={FONTSIZE.size_18} 
          color={searchText.length > 0 ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}></CustomIcon>
        </TouchableOpacity>
        <TextInput placeholder='Find your coffee...' 
        value={searchText} 
        onChangeText={text => setSearchText(text)}
        placeholderTextColor={COLORS.primaryLightGreyHex}
        style={styles.TextInputContainer} ></TextInput>
      </View>
      {/* Category Scroller */}
      <ScrollView horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.CategoryScrollViewStyle}>
        {categories.map((data,index) =>(
          <View key={index.toString()} 
            style={styles.CategoryScrollViewContainer}>
            <TouchableOpacity style ={styles.CategoryScrollViewItem} onPress={() => {}}>
              <Text 
                style={[
                  styles.CategoryText,
                  categoryIndex.index == index ? {} : {}
              ]}>
                {data}
              </Text>
              {categoryIndex.index == index ? (
                <View style={styles.ActiveCategory} />
              ) : (
                 <></>
              )}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  </View>
}

const styles = StyleSheet.create({
  ScreenContainer:{
    flex:1,
    backgroundColor: COLORS.primaryBlackHex
  },
  ScrollViewFlex:{
    flexGrow: 1,

  },
  ScreenTitle:{
    fontSize:FONTSIZE.size_28,
    fontFamily:FONTFAMILY.poppins_semibold,
    color:COLORS.primaryWhiteHex,
    paddingLeft:SPACING.space_30

  },
  InputContainerComponent: {
    margin:SPACING.space_30,
    borderRadius:BORDERRADIUS.radius_20,
    backgroundColor:COLORS.primaryDarkGreyHex,
    flexDirection: 'row',
    alignItems:'center'
  },
  InputIcon:{
    marginHorizontal:SPACING.space_20
  },
  TextInputContainer:{
    flex:1,
    height:SPACING.space_20*3,
    fontFamily:FONTFAMILY.poppins_medium,
    fontSize:FONTSIZE.size_14,
    color:COLORS.primaryWhiteHex,
    marginBottom:SPACING.space_4
  },
  CategoryScrollViewItem:{
    alignItems: 'center'
  },
  CategoryText:{
    fontFamily:FONTFAMILY.poppins_semibold,
    fontSize:FONTSIZE.size_16,
    color:COLORS.primaryLightGreyHex
  },
  CategoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20
  },
  CategoryScrollViewContainer:{
    paddingHorizontal: SPACING.space_15
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex
  }
})

export default HomeScreen
 