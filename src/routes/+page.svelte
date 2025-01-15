<script>
  import FileUploader from '../lib/components/FileUploader.svelte';
  import SideBar from '../lib/components/SideBar.svelte';

  const sidebarItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#contact', label: 'Contact' }
  ];
</script>

<SideBar pageName='Janus Web'/>