import {memo} from 'react';
import {Box, Typography, SxProps} from "@mui/material";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import {ReactComponent as CircleBrandCard} from "../../../assets/icons/circleBrandCard.svg";
import {useAppSelector} from "../../../store"


const BrandSlide = ({brand, activeBrand, ordersPriceChanges, ordersPrice}: IBrandSlideProps): JSX.Element => {

  const {darkMode} = useAppSelector(st => st.ui)

  const formatSum = (number: number, isChanges: boolean) => {
    let res = ""
    if (isChanges) {
      let tempStr = ""
      if (number < 0) {
        res = res + "-"
        tempStr = number.toString().slice(1, number.toString().length)
      } else {
        res = res + "+"
        tempStr = number.toString()
      }
      const format = tempStr.split( /(?=(?:\d{3})+(?!\d))/ )
      format.forEach(item => {
        res = res+" "+item
      })
    } else {
      const format = number.toString().split( /(?=(?:\d{3})+(?!\d))/ )
      format.forEach(item => {
        res = res+" "+item
      })
    }
    return res
  }

  return (
    <>
      <Box sx={{
        backgroundColor: activeBrand === brand ? darkMode ? "#3D447E" : "#2196F3" : darkMode ? "#29314F" : "#90CAF9",
        ...styles.wrapCard
      }}>
        <Box sx={styles.infoCard}>
          <Typography sx={styles.textCard}>{brand}</Typography>
          <Typography sx={styles.textCard}>{formatSum(ordersPrice, false)} ₽</Typography>
          {
            ordersPriceChanges !== 0 &&
              <Box sx={styles.orders}>
                {
                  ordersPriceChanges > 0 ?
                    <ExpandLessRoundedIcon sx={styles.rise}/>
                    :
                    <ExpandMoreRoundedIcon sx={styles.fall}/>
                }
                  <Typography>{formatSum(ordersPriceChanges, true)} ₽</Typography>
              </Box>
          }
        </Box>
      </Box>
      <Box sx={styles.circle}>
        <CircleBrandCard/>
      </Box>
    </>
  );
};

const styles: Record<string, SxProps> = {
  wrapCard: {
    height: "100%",
    transition: "all 0.3s"
  },
  infoCard: {
    position: "absolute",
    top: "50%",
    left: "15px",
    transform: "translateY(-50%)"
  },
  textCard: {
    color: "#fff",
    fontWeight: 700,
    fontSize: "22px"
  },
  orders: {
    display: "flex",
    alignItems: "center",
    "& p": {
      ml: "10px",
      color: "#fff"
    }
  },
  circle: {
    position: "absolute",
    bottom: "-100px",
    right: "-200px"
  },
  rise: {
    color: "#00C853",
  },
  fall: {
    color: "#D84315",
  }
}

export default memo(BrandSlide);