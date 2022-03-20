import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm, useField } from 'react-final-form-hooks';
import { Grid } from '@mui/material';

export type EditCharacterFormValues = {
  height: string;
  mass: string;
};

type Props = {
  isOpen: boolean;
  close: () => void;
  onSubmit: (values: EditCharacterFormValues) => void;
  initialValues: EditCharacterFormValues;
};

export default function EditCharacterModal(props: Props) {
  const { isOpen, close, onSubmit, initialValues } = props;

  const { form, handleSubmit, pristine, submitting } = useForm({
    initialValues,
    onSubmit,
  });
  const height = useField('height', form);
  const mass = useField('mass', form);

  return (
    <Dialog open={isOpen} onClose={close}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item>
              <TextField
                {...height.input}
                autoFocus
                margin="dense"
                id="height"
                label="Height"
                type="text"
                variant="standard"
              />
            </Grid>
            <Grid item>
              <TextField
                {...mass.input}
                autoFocus
                margin="dense"
                id="mass"
                label="Mass"
                type="text"
                variant="standard"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button type="submit" onClick={close} disabled={pristine || submitting}>
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
