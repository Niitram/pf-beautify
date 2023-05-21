import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.gif}>
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </div>
  );
};

export default Loading;

// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';

// export default function CircularIndeterminate() {
