import Button from '@mui/material/Button';

export default function AtomButton({ children, fullWidth, ...props }) {
  return (
    <Button
      variant="contained"
      color={props.color || 'primary'}
      fullWidth={!!fullWidth}
      sx={{
        borderRadius: 2,
        textTransform: 'none',
        fontWeight: 600,
        boxShadow: 'none',
        fontSize: 16,
        py: 1.2,
        px: 2.5,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
