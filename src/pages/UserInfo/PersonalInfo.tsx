import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@/components/cards/base/CardHeader';
import CardBody from '@/components/cards/base/CardBody';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

const FormCard = styled(Card)({
  height: '100%',
});

const InfoIconWrapper = styled(Box)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginLeft: theme.spacing(1),
  display: 'inline-flex',
  verticalAlign: 'middle',
}));

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  language: string;
  bio: string;
}

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Invalid phone number'),
  bio: Yup.string()
    .max(500, 'Bio must be at most 500 characters')
});

const initialValues: FormValues = {
  firstName: 'Sarah',
  lastName: 'Johnson',
  email: 'sarah.johnson@example.com',
  phone: '+1 (555) 123-4567',
  country: 'US',
  language: 'en',
  bio: 'Full-stack developer with a passion for creating user-friendly applications...',
};

const PersonalInfo: React.FC = () => {
  const [editing, setEditing] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  const handleSubmit = async (values: FormValues) => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form values:', values);
      setEditing(false);
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <FormCard>
      <CardHeader
        title="Personal Information"
        subtitle="Update your personal details and information"
        action={
          !editing && (
            <Button
              variant="contained"
              onClick={() => setEditing(true)}
            >
              Edit
            </Button>
          )
        }
      />
      <CardBody>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik: FormikProps<FormValues>) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    disabled={!editing}
                    InputProps={{
                      endAdornment: (
                        <Tooltip title="This email will be used for account-related notifications">
                          <InfoIconWrapper>
                            <InfoIcon fontSize="small" />
                          </InfoIconWrapper>
                        </Tooltip>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Country"
                    name="country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    disabled={!editing}
                  >
                    <MenuItem value="US">United States</MenuItem>
                    <MenuItem value="UK">United Kingdom</MenuItem>
                    <MenuItem value="CA">Canada</MenuItem>
                    <MenuItem value="AU">Australia</MenuItem>
                    <MenuItem value="DE">Germany</MenuItem>
                    <MenuItem value="FR">France</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Language"
                    name="language"
                    value={formik.values.language}
                    onChange={formik.handleChange}
                    disabled={!editing}
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Spanish</MenuItem>
                    <MenuItem value="fr">French</MenuItem>
                    <MenuItem value="de">German</MenuItem>
                    <MenuItem value="zh">Chinese</MenuItem>
                    <MenuItem value="ja">Japanese</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Bio"
                    name="bio"
                    value={formik.values.bio}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.bio && Boolean(formik.errors.bio)}
                    helperText={
                      (formik.touched.bio && formik.errors.bio) ||
                      `${formik.values.bio.length}/500 characters`
                    }
                    disabled={!editing}
                  />
                </Grid>
                {editing && (
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        formik.resetForm();
                        setEditing(false);
                      }}
                      startIcon={<CloseIcon />}
                      disabled={saving}
                    >
                      Cancel
                    </Button>
                    <LoadingButton
                      variant="contained"
                      type="submit"
                      loading={saving}
                      loadingPosition="start"
                      startIcon={<SaveIcon />}
                    >
                      Save Changes
                    </LoadingButton>
                  </Grid>
                )}
              </Grid>
            </Form>
          )}
        </Formik>
      </CardBody>
    </FormCard>
  );
};

export default PersonalInfo; 