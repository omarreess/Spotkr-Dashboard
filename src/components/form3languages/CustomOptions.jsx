import { Box } from "@mui/material";
import CustomMuiButton from "./CustomMuiButton";
export default function CustomOptions({ formLanguageSwitcher, lang, onClick }) {
  return (
    <Box
      display="flex"
      marginLeft={4}
      marginBottom={2}
      flexDirection="row"
      gap={3}
      justifyContent={"start"}
    >
      {formLanguageSwitcher?.map((key, index) => (
        <Box key={index}>
          <CustomMuiButton
          background={lang === key ? 'red' : "blue"}
            // color={lang === key ? 'red' : "secondary"}
            variant={  "contained" }
            
            isDispatch={true}
            // color='primary'
            type="button"
            onClick={onClick}
            text={key}
          />
        </Box>
      ))}
    </Box>
  );
}
